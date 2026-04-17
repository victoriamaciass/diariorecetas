/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  ChefHat, 
  Utensils, 
  ShoppingCart, 
  Instagram, 
  Pin as Pinterest, 
  ExternalLink,
  Search,
  BookOpen
} from 'lucide-react';

// Types
interface Product {
  id: string;
  model: number;
  size: string;
  pages: number;
  emoji: string;
  color: string;
}

// Data: 18 products as requested
const PRODUCTS: Product[] = [
  // Model 1
  { id: 'm1-1', model: 1, size: '6x9', pages: 102, emoji: '🍲', color: '#A0522D' },
  { id: 'm1-2', model: 1, size: '6x9', pages: 202, emoji: '🥗', color: '#A0522D' },
  { id: 'm1-3', model: 1, size: '8x10', pages: 132, emoji: '🥧', color: '#A0522D' },
  { id: 'm1-4', model: 1, size: '8x10', pages: 152, emoji: '🥘', color: '#A0522D' },
  { id: 'm1-5', model: 1, size: '8.5x11', pages: 122, emoji: '🥣', color: '#A0522D' },
  { id: 'm1-6', model: 1, size: '8.5x11', pages: 202, emoji: '🍳', color: '#A0522D' },

  // Model 2
  { id: 'm2-1', model: 2, size: '6x9', pages: 122, emoji: '🍝', color: '#5A5A40' },
  { id: 'm2-2', model: 2, size: '6x9', pages: 152, emoji: '🥟', color: '#5A5A40' },
  { id: 'm2-3', model: 2, size: '8x10', pages: 102, emoji: '🍛', color: '#5A5A40' },
  { id: 'm2-4', model: 2, size: '8x10', pages: 202, emoji: '🍱', color: '#5A5A40' },
  { id: 'm2-5', model: 2, size: '8.5x11', pages: 132, emoji: '🍜', color: '#5A5A40' },
  { id: 'm2-6', model: 2, size: '8.5x11', pages: 152, emoji: '🍣', color: '#5A5A40' },

  // Model 3
  { id: 'm3-1', model: 3, size: '6x9', pages: 202, emoji: '🥙', color: '#8B4513' },
  { id: 'm3-2', model: 3, size: '6x9', pages: 132, emoji: '🧆', color: '#8B4513' },
  { id: 'm3-3', model: 3, size: '8x10', pages: 122, emoji: '🌮', color: '#8B4513' },
  { id: 'm3-4', model: 3, size: '8x10', pages: 152, emoji: '🌯', color: '#8B4513' },
  { id: 'm3-5', model: 3, size: '8.5x11', pages: 102, emoji: '🥨', color: '#8B4513' },
  { id: 'm3-6', model: 3, size: '8.5x11', pages: 202, emoji: '🥐', color: '#8B4513' },
];

const SIZES = ['Todos los tamaños', '6x9', '8x10', '8.5x11'];

export default function App() {
  const [filter, setFilter] = useState('Todos los tamaños');

  const filteredProducts = useMemo(() => {
    if (filter === 'Todos los tamaños') return PRODUCTS;
    return PRODUCTS.filter(p => p.size === filter);
  }, [filter]);

  const handleAmazonClick = (name: string) => {
    alert(`Enlace a Amazon para ${name} - sustituir por URL real`);
  };

  const handleSocialClick = (platform: string) => {
    alert(`Enlace a ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]"></div>

      {/* Header */}
      <header className="relative py-16 px-4 bg-[#FAFAF9] border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#5A5A40] mb-4 tracking-tight">
              📖 DIARIOS DE RECETAS
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-[#A0522D] mb-6">
              Elige la versión que mejor se adapte a tu cocina
            </p>
            <div className="w-24 h-1 bg-[#A0522D]/20 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-stone-600 leading-relaxed">
              Gracias por confiar en mis cuadernos. Aquí encontrarás todas las variantes disponibles de este diario, diseñadas con amor para atesorar tus secretos culinarios.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-stone-300 hidden lg:block">
          <Utensils size={48} />
        </div>
        <div className="absolute bottom-8 right-8 text-stone-300 hidden lg:block">
          <ChefHat size={48} />
        </div>
      </header>

      {/* Important Note Banner */}
      <div className="bg-[#A0522D] text-white py-3 px-4 text-center overflow-hidden">
        <motion.p 
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-sm font-medium tracking-wide flex items-center justify-center gap-2"
        >
          <Book size={16} />
          🔔 ¿Buscas más páginas? Todos los modelos disponibles hasta 202 páginas.
        </motion.p>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setFilter(size)}
              className={`
                px-6 py-2.5 rounded-full border transition-all duration-300 text-sm font-medium
                ${filter === size 
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-md transform scale-105' 
                  : 'bg-white text-[#5A5A40] border-stone-200 hover:border-[#5A5A40] hover:bg-stone-50'
                }
              `}
            >
              {size === 'Todos los tamaños' ? size : `${size} pulgadas`}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col items-center text-center group"
              >
                {/* Product Image Placeholder */}
                <div 
                  className="w-full aspect-[4/5] rounded-xl flex items-center justify-center text-6xl mb-6 transition-transform duration-500 group-hover:scale-110 relative overflow-hidden"
                  style={{ backgroundColor: `${product.color}15` }}
                >
                  <span className="relative z-10">{product.emoji}</span>
                  {/* Decorative faint pattern */}
                  <div className="absolute inset-0 opacity-10 flex flex-wrap gap-2 p-2 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <BookOpen key={i} size={12} className="text-stone-400" />
                    ))}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-serif text-xl text-stone-800 mb-2">
                    Diario de Recetas – Modelo {product.model}
                  </h3>
                  <div className="space-y-1 mb-6">
                    <p className="text-sm text-stone-500 flex items-center justify-center gap-1.5 font-medium">
                      <Search size={14} />
                      Tamaño: {product.size} pulgadas
                    </p>
                    <p className="text-sm text-[#A0522D] font-medium italic">
                      {product.pages} páginas
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleAmazonClick(`Modelo ${product.model} (${product.size})`)}
                  className="w-full mt-auto bg-[#5A5A40] hover:bg-[#4A4A35] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm group/btn"
                >
                  <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
                  Ver en Amazon
                  <ExternalLink size={14} className="opacity-50" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state if no products match */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 italic">No se encontraron diarios con este formato.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#FAFAF9] border-t border-stone-200 mt-20 py-12 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-8">
            <button 
              onClick={() => handleSocialClick('Instagram')}
              className="text-[#5A5A40] hover:text-[#A0522D] transition-colors"
            >
              <Instagram size={28} />
            </button>
            <button 
              onClick={() => handleSocialClick('Pinterest')}
              className="text-[#5A5A40] hover:text-[#A0522D] transition-colors"
            >
              <Pinterest size={28} />
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-stone-600">
              ¿Tienes sugerencias para nuevos formatos? Escríbeme a{' '}
              <a href="mailto:hola@diariosderecetas.com" className="text-[#A0522D] hover:underline font-medium">
                hola@diariosderecetas.com
              </a>
            </p>
            <div className="w-12 h-px bg-stone-300 mx-auto"></div>
            <p className="text-xs text-stone-400 uppercase tracking-widest">
              © 2026 Diarios de Recetas – Cultivando Momentos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
