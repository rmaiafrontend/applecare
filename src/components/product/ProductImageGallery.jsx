import { motion, AnimatePresence } from 'framer-motion';
import { Truck, RotateCcw, Package } from 'lucide-react';

export default function ProductImageGallery({
  images, currentImage, onChangeImage,
  isAvailable, expressDelivery, isUsed, hasDiscount, discountPercent, productName,
}) {
  return (
    <div className="relative bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="relative aspect-[4/5] overflow-hidden">
        <AnimatePresence mode="wait">
          {images.length > 0 ? (
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              src={images[currentImage]}
              alt={productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/80 flex items-center justify-center shadow-sm">
                <Package className="w-10 h-10 text-gray-300" strokeWidth={1.4} />
              </div>
              <p className="text-sm font-medium text-gray-300 mt-3">Sem imagem</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {isAvailable && expressDelivery && (
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10">
                <Truck className="w-3 h-3" />
                Express 1h
              </span>
            )}
            {isUsed && isAvailable && (
              <span className="inline-flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
                Seminovo
              </span>
            )}
            {!isAvailable && (
              <span className="inline-flex items-center bg-gray-900/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg">
                Indisponivel
              </span>
            )}
          </div>

          {hasDiscount && isAvailable && (
            <span className="inline-flex items-center gap-1 bg-red-500/90 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-[14px] leading-none">-{discountPercent}%</span>
              <span className="text-white/70 text-[10px] font-medium uppercase">off</span>
            </span>
          )}
        </div>

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onChangeImage(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentImage === index ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
