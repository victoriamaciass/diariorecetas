/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  ChefHat, 
  Utensils, 
  ShoppingCart, 
  Instagram, 
  Pin as Pinterest, 
  ExternalLink,
  ChevronRight,
  Mail,
  ArrowRight,
  Info
} from 'lucide-react';

// Types
interface Variant {
  id: string;
  size: string;
  pages: number;
}

interface Model {
  id: number;
  name: string;
  image: string;
  sizes: string[];
  pageRange: string;
  variants: Variant[];
  color: string;
}

// Generate the variants data
const SIZES = ['6x9', '8x10', '8.5x11'];
const PAGES = [102, 122, 132, 152, 202];

const generateVariants = (modelId: number): Variant[] => {
  const v: Variant[] = [];
  SIZES.forEach(size => {
    PAGES.forEach(pages => {
      v.push({
        id: `m${modelId}-${size}-${pages}`,
        size,
        pages
      });
    });
  });
  return v;
};

const MODELS: Model[] = [
  {
    id: 1,
    name: 'Modelo 1 - Clásico Floral',
    image: 'https://i.ibb.co/pBdM3rJK/1-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(1),
    color: '#A0522D' // Terracotta
  },
  {
    id: 2,
    name: 'Modelo 2 - Minimal Olive',
    image: 'https://i.ibb.co/0Vq1Wfxz/2-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(2),
    color: '#5A5A40' // Olive
  },
  {
    id: 3,
    name: 'Modelo 3 - Vintage Kraft',
    image: 'https://i.ibb.co/QjtQSm2b/3-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(3),
    color: '#8B4513' // Brown
  }
];

const FILTER_OPTIONS = ['Todos los modelos', 'Modelo 1', 'Modelo 2', 'Modelo 3'];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos los modelos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to active filter button if needed
  useEffect(() => {
    const activeButton = scrollContainerRef.current?.querySelector(`[data-active="true"]`);
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeFilter]);

  const handleAmazonClick = (name: string) => {
    alert(`Redirigiendo a Amazon para: ${name}\n(Sustituir por URL real del afiliado)`);
  };

  const handleSocialClick = (platform: string) => {
    alert(`Enlace a ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800 selection:bg-[#A0522D]/20">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-50"></div>

      {/* Top Banner Message */}
      <div className="bg-[#A0522D] text-[#FAFAF9] py-2 px-4 shadow-sm relative z-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-center flex items-center justify-center gap-2">
          <span className="animate-pulse">✨</span> ¿Buscas más páginas? Hasta 202 disponibles
        </p>
      </div>

      {/* Header */}
      <header className="bg-[#FAFAF9] pt-10 pb-8 px-6 text-center border-b border-stone-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-[#5A5A40] mb-2 tracking-tight">
            📖 DIARIOS DE RECETAS
          </h1>
          <p className="font-serif italic text-[#A0522D] text-lg mb-4">
            Elige tu próxima versión
          </p>
          <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
            Gracias por confiar en mis cuadernos. Cada página está pensada para tus mejores momentos en la cocina.
          </p>
        </motion.div>
      </header>

      {/* Filter Navigation (Horizontal Scroll on Mobile) */}
      <nav className="sticky top-0 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200 z-40 py-4">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-3 px-6 scroll-smooth items-center justify-start md:justify-center"
        >
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              data-active={activeFilter === option}
              onClick={() => setActiveFilter(option)}
              className={`
                whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeFilter === option 
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-md' 
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {activeFilter === 'Todos los modelos' ? (
            /* Summary View: 3 Cards */
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {MODELS.map((model) => (
                <div 
                  key={model.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex flex-col group h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-stone-50 text-[#A0522D]">
                        <Utensils size={20} />
                      </div>
                      <h3 className="font-serif text-2xl text-stone-800">Modelo {model.id}</h3>
                    </div>

                    <div className="space-y-3 mb-8 text-stone-600">
                      <p className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                        Tamaños: 6x9, 8x10, 8.5x11
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                        Páginas: {model.pageRange}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveFilter(`Modelo ${model.id}`)}
                      className="mt-auto w-full min-h-[48px] bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      Ver variantes
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            /* Detailed View: 15 Cards per model */
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {MODELS.find(m => `Modelo ${m.id}` === activeFilter)?.variants.map((variant) => {
                const model = MODELS.find(m => `Modelo ${m.id}` === activeFilter)!;
                return (
                  <div 
                    key={variant.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex gap-5 items-center hover:shadow-md transition-shadow group"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-inner bg-stone-50 border border-stone-100">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-stone-800 mb-1 leading-tight">
                        Modelo {model.id} – {variant.size}
                      </h4>
                      <p className="text-[#A0522D] text-sm font-bold mb-3 italic">
                        {variant.pages} páginas
                      </p>
                      
                      <button
                        onClick={() => handleAmazonClick(`Modelo ${model.id} (${variant.size}, ${variant.pages} págs)`)}
                        className="min-h-[44px] w-full bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <ShoppingCart size={16} />
                        Ver en Amazon
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Floating Icon (Mobile only corner) */}
      <div className="fixed bottom-24 right-6 pointer-events-none text-stone-300/30 md:hidden">
        <ChefHat size={64} />
      </div>

      {/* Footer */}
      <footer className="bg-[#FAFAF9] border-t border-stone-200 mt-20 py-12 px-8">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h4 className="flex items-center justify-center gap-2 text-stone-400 font-medium">
              <Mail size={16} />
              ¿Sugerencias?
            </h4>
            <a 
              href="mailto:misrecetas@diarios.com" 
              className="text-[#A0522D] hover:underline font-serif italic text-lg decoration-stone-200"
            >
              misrecetas@diarios.com
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <button 
              onClick={() => handleSocialClick('Instagram')}
              className="w-12 h-12 rounded-2xl bg-stone-100 text-[#5A5A40] flex items-center justify-center hover:bg-stone-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </button>
            <button 
              onClick={() => handleSocialClick('Pinterest')}
              className="w-12 h-12 rounded-2xl bg-stone-100 text-[#5A5A40] flex items-center justify-center hover:bg-stone-200 transition-colors"
              aria-label="Pinterest"
            >
              <Pinterest size={22} />
            </button>
          </div>

          <div className="pt-8 border-t border-stone-100">
            <p className="text-[10px] uppercase tracking-widest text-stone-400">
             © 2026 Diarios de Recetas • Hecho con amor para amantes de la cocina
            </p>
          </div>
        </div>
      </footer>

      {/* Persistent Helper Button (Optional floating note) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => alert("¡Hola! Explora las variantes deslizando los filtros o seleccionando un modelo.")}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-stone-200 text-[#A0522D] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Info size={20} />
        </button>
      </div>
    </div>
  );
}
