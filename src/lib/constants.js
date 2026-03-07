export const WHATSAPP_NUMBER = '5511999999999';

export const STORE_INFO = {
  name: 'WEGX Fast Delivery',
  tagline: 'Apple Premium Reseller | Entrega Express',
  bio: 'Produtos Apple 100% originais com garantia. Entrega em ate 1 hora na sua regiao.',
  whatsapp: WHATSAPP_NUMBER,
  whatsappMessage: 'Ola! Gostaria de saber mais sobre os produtos WEGX',
  instagram: 'https://instagram.com/wegxdelivery',
  tiktok: 'https://tiktok.com/@wegxdelivery',
  youtube: 'https://youtube.com/@wegxdelivery',
  location: 'Sao Paulo, SP',
  hours: {
    weekday: { open: 9, close: 18 },
    saturday: { open: 9, close: 14 },
    sunday: null,
  },
};

export const QUERY_KEYS = {
  products: ['products'],
  categories: ['categories'],
  tags: ['tags'],
  cart: ['cart'],
  orders: ['orders'],
  allProducts: ['allProducts'],
  user: ['user'],
  currentUser: ['currentUser'],
  storeConfig: ['store_config'],
  chatConfig: ['chat_config'],
  paymentConfig: ['payment_config'],
  homeConfig: ['home_config'],
  catalogConfigs: ['catalog_configs'],
  product: (id) => ['product', id],
  category: (id) => ['category', id],
  order: (id) => ['order', id],
  relatedProducts: (categoryId) => ['relatedProducts', categoryId],
  productsByCategory: (categoryId) => ['products', categoryId],
};
