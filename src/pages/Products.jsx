import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { mapProductFromApi, mapCategoryFromApi } from '@/api/adapters';
import {
  useSlug,
  usePublicProducts,
  usePublicCategory,
  useCart,
  useAddToCart,
  useUpdateCartItem,
} from '@/api/hooks';
import { mapCartItemFromApi } from '@/api/adapters';

export default function Products() {
  const slug = useSlug();
  const [addingProduct, setAddingProduct] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [showExpressOnly, setShowExpressOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('category');

  const productParams = useMemo(() => {
    const params = { tamanho: 200 };
    if (categoryId) params.categoriaId = Number(categoryId);
    return params;
  }, [categoryId]);

  const { data: productsPage, isLoading: loadingProducts } = usePublicProducts(slug, productParams);
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const { data: categoryRaw } = usePublicCategory(slug, Number(categoryId));
  const category = useMemo(() => categoryRaw ? mapCategoryFromApi(categoryRaw) : null, [categoryRaw]);

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartItems = useMemo(() => cartItemsRaw.map(mapCartItemFromApi), [cartItemsRaw]);
  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const addToCartMutation = useAddToCart(slug);
  const updateCartItemMutation = useUpdateCartItem(slug);

  const handleAddToCart = async (product) => {
    setAddingProduct(product.id);
    try {
      const existingItem = cartItems.find(item => item.product_id === product.id);
      if (existingItem) {
        await updateCartItemMutation.mutateAsync({
          id: existingItem.id,
          data: { quantidade: existingItem.quantity + 1 },
        });
      } else {
        await addToCartMutation.mutateAsync({
          produtoId: product.id,
          quantidade: 1,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setAddingProduct(null);
  };

  let filteredProducts = [...products];

  if (showExpressOnly) {
    filteredProducts = filteredProducts.filter(p => p.express_delivery);
  }

  if (showInStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.stock > 0);
  }

  if (sortBy === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const sortLabels = {
    relevance: 'Relevancia',
    price_asc: 'Menor Preco',
    price_desc: 'Maior Preco'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header
        title={category?.name || 'Produtos'}
        showBack
        showCart
        cartCount={cartCount}
      />

      <main className="pt-12 max-w-lg mx-auto">
        {/* Filters Bar */}
        <div className="sticky top-14 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  {sortLabels[sortBy]}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy('relevance')}>
                  Relevancia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price_asc')}>
                  Menor Preco
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price_desc')}>
                  Maior Preco
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="express"
                      checked={showExpressOnly}
                      onCheckedChange={setShowExpressOnly}
                    />
                    <label htmlFor="express" className="text-sm font-medium">
                      Apenas Entrega Express
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="instock"
                      checked={showInStockOnly}
                      onCheckedChange={setShowInStockOnly}
                    />
                    <label htmlFor="instock" className="text-sm font-medium">
                      Apenas em Estoque
                    </label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          {loadingProducts ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAdding={addingProduct === product.id}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-2">Nenhum produto encontrado</p>
              <p className="text-sm text-gray-400">Tente ajustar os filtros</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
