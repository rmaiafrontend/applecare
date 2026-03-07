/**
 * API local: produtos e categorias com CRUD via localStorage,
 * carrinho e pedidos no localStorage.
 * Na primeira carga, faz seed a partir do JSON estático.
 */

const CART_KEY = 'apple_cart';
const ORDERS_KEY = 'apple_orders';
const PRODUCTS_KEY = 'admin_products';
const CATEGORIES_KEY = 'admin_categories';

let dataSeeded = false;

function generateId(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getStorage(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStorage(key, data) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (_) {}
}

async function ensureSeeded() {
  if (dataSeeded && getStorage(PRODUCTS_KEY)) return;
  if (!getStorage(PRODUCTS_KEY) || !getStorage(CATEGORIES_KEY)) {
    const res = await fetch('/data/products.json');
    if (!res.ok) throw new Error('Falha ao carregar produtos');
    const data = await res.json();
    if (!getStorage(PRODUCTS_KEY)) setStorage(PRODUCTS_KEY, data.products || []);
    if (!getStorage(CATEGORIES_KEY)) setStorage(CATEGORIES_KEY, data.categories || []);
  }
  dataSeeded = true;
}

function getProducts() {
  return getStorage(PRODUCTS_KEY) || [];
}

function setProducts(products) {
  setStorage(PRODUCTS_KEY, products);
}

function getCategories() {
  return getStorage(CATEGORIES_KEY) || [];
}

function setCategories(categories) {
  setStorage(CATEGORIES_KEY, categories);
}

function getCart() {
  return getStorage(CART_KEY) || [];
}

function setCart(items) {
  setStorage(CART_KEY, items);
}

function getOrders() {
  return getStorage(ORDERS_KEY) || [];
}

function setOrders(orders) {
  setStorage(ORDERS_KEY, orders);
}

export const localApi = {
  Category: {
    list: async (sort) => {
      await ensureSeeded();
      const categories = getCategories();
      const out = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return out;
    },
    filter: async (query) => {
      await ensureSeeded();
      const categories = getCategories();
      if (query.id) {
        const cat = categories.find((c) => c.id === query.id);
        return cat ? [cat] : [];
      }
      return [];
    },
    create: async (body) => {
      await ensureSeeded();
      const categories = getCategories();
      const id = generateId('cat');
      const maxOrder = categories.reduce((max, c) => Math.max(max, c.order ?? 0), 0);
      const cat = { id, order: maxOrder + 1, is_promotion: false, ...body };
      categories.push(cat);
      setCategories(categories);
      return cat;
    },
    update: async (id, body) => {
      await ensureSeeded();
      const categories = getCategories();
      const i = categories.findIndex((c) => c.id === id);
      if (i === -1) return null;
      categories[i] = { ...categories[i], ...body };
      setCategories(categories);
      return categories[i];
    },
    delete: async (id) => {
      await ensureSeeded();
      const categories = getCategories().filter((c) => c.id !== id);
      setCategories(categories);
    },
    reorder: async (orderedIds) => {
      await ensureSeeded();
      const categories = getCategories();
      orderedIds.forEach((id, idx) => {
        const cat = categories.find((c) => c.id === id);
        if (cat) cat.order = idx + 1;
      });
      setCategories(categories);
    },
  },

  Product: {
    list: async (sort, limit = 100) => {
      await ensureSeeded();
      let out = [...getProducts()];
      const desc = sort && String(sort).startsWith('-');
      const field = (sort && String(sort).replace(/^-/, '')) || 'created_date';
      out.sort((a, b) => {
        const va = a[field] || a.id || '';
        const vb = b[field] || b.id || '';
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return desc ? -cmp : cmp;
      });
      if (limit != null && limit > 0) out = out.slice(0, limit);
      return out;
    },
    filter: async (query) => {
      await ensureSeeded();
      const list = getProducts();
      if (query.id) {
        const p = list.find((x) => x.id === query.id);
        return p ? [p] : [];
      }
      if (query.category_id != null) {
        return list.filter((x) => x.category_id === query.category_id);
      }
      return [];
    },
    create: async (body) => {
      await ensureSeeded();
      const products = getProducts();
      const id = generateId('prod');
      const product = {
        id,
        created_date: new Date().toISOString(),
        images: [],
        specs: [],
        stock: 0,
        express_delivery: false,
        ...body,
      };
      products.push(product);
      setProducts(products);
      return product;
    },
    update: async (id, body) => {
      await ensureSeeded();
      const products = getProducts();
      const i = products.findIndex((p) => p.id === id);
      if (i === -1) return null;
      products[i] = { ...products[i], ...body };
      setProducts(products);
      return products[i];
    },
    delete: async (id) => {
      await ensureSeeded();
      const products = getProducts().filter((p) => p.id !== id);
      setProducts(products);
    },
  },

  CartItem: {
    list: async () => Promise.resolve(getCart()),

    create: async (body) => {
      const items = getCart();
      const id = crypto.randomUUID?.() || `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const item = { id, product_id: body.product_id, quantity: body.quantity ?? 1 };
      items.push(item);
      setCart(items);
      return Promise.resolve(item);
    },

    update: async (id, body) => {
      const items = getCart();
      const i = items.findIndex((x) => x.id === id);
      if (i === -1) return Promise.resolve();
      if (body.quantity != null) items[i].quantity = body.quantity;
      setCart(items);
      return Promise.resolve();
    },

    delete: async (id) => {
      const items = getCart().filter((x) => x.id !== id);
      setCart(items);
      return Promise.resolve();
    },
  },

  Order: {
    list: async (sort) => {
      const orders = getOrders();
      const desc = sort && String(sort).startsWith('-');
      const out = [...orders].sort((a, b) => {
        const da = a.created_at || a.estimated_delivery || '';
        const db = b.created_at || b.estimated_delivery || '';
        const cmp = da < db ? -1 : da > db ? 1 : 0;
        return desc ? -cmp : cmp;
      });
      return Promise.resolve(out);
    },

    filter: async (query) => {
      const orders = getOrders();
      if (query.id != null) {
        const o = orders.find((x) => x.id === query.id);
        return Promise.resolve(o ? [o] : []);
      }
      if (query.order_number != null) {
        const o = orders.find((x) => x.order_number === query.order_number);
        return Promise.resolve(o ? [o] : []);
      }
      return Promise.resolve([]);
    },

    create: async (payload) => {
      const orders = getOrders();
      const id = crypto.randomUUID?.() || `ord-${Date.now()}`;
      const order_number = payload.order_number || `ORD-${Date.now()}`;
      const created_at = new Date().toISOString();
      const order = {
        id,
        order_number,
        created_at,
        ...payload,
      };
      orders.push(order);
      setOrders(orders);
      return Promise.resolve({ id, order_number, ...order });
    },

    update: async (id, body) => {
      const orders = getOrders();
      const i = orders.findIndex((x) => x.id === id);
      if (i === -1) return Promise.resolve();
      orders[i] = { ...orders[i], ...body };
      setOrders(orders);
      return Promise.resolve();
    },
  },
};
