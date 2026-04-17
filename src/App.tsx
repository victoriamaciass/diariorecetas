/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  Utensils, 
  ShoppingCart, 
  Instagram, 
  Pin as Pinterest, 
  ChevronLeft,
  Mail,
  ArrowRight,
  Info,
  BookOpen
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
  description: string;
  image: string;
  sizes: string[];
  pageRange: string;
  variants: Variant[];
  color: string;
  emoji: string;
}

// Data constants
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
    name: 'Modelo 1',
    description: 'Clásico Floral',
    image: 'https://i.ibb.co/pBdM3rJK/1-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(1),
    color: '#A0522D', // Terracotta
    emoji: '🍲'
  },
  {
    id: 2,
    name: 'Modelo 2',
    description: 'Minimal Olive',
    image: 'https://i.ibb.co/0Vq1Wfxz/2-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(2),
    color: '#5A5A40', // Olive
    emoji: '🥘'
  },
  {
    id: 3,
    name: 'Modelo 3',
    description: 'Vintage Kraft',
    image: 'https://i.ibb.co/QjtQSm2b/3-modelo-recetas.jpg',
    sizes: SIZES,
    pageRange: '102 a 202',
    variants: generateVariants(3),
    color: '#8B4513', // Brown
    emoji: '👩‍🍳'
  }
];

const FILTER_OPTIONS = ['Todos los modelos', 'Modelo 1', 'Modelo 2', 'Modelo 3'];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos los modelos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll filter bar for active state
  useEffect(() => {
    const activeButton = scrollContainerRef.current?.querySelector(`[data-active="true"]`);
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeFilter]);

  const handleAmazonClick = (name: string) => {
    alert(`Enlace Amazon para: ${name} - sustituir por URL real`);
  };

  const selectedModel = useMemo(() => {
    return MODELS.find(m => m.name === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800 selection:bg-[#A0522D]/20">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-50"></div>

      {/* Top Banner Alert */}
      <div className="bg-[#A0522D] text-[#FAFAF9] py-2 px-4 shadow-sm relative z-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-center flex items-center justify-center gap-1.5">
          <span className="animate-pulse">✨</span> ¿Buscas más páginas? Hasta 202 disponibles
        </p>
      </div>

      {/* Header */}
      <header className="bg-[#FAFAF9] pt-12 pb-8 px-6 text-center border-b border-stone-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-[#5A5A40]">
              <ChefHat size={32} />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#5A5A40] mb-2 tracking-tight">
            📖 DIARIOS DE RECETAS
          </h1>
          <p className="font-serif italic text-[#A0522D] text-lg mb-4">
            Elige tu próxima versión
          </p>
          <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
            Gracias por confiar en mis cuadernos para guardar tus mejores momentos culinarios.
          </p>
        </motion.div>
      </header>

      {/* Sub-Header Horizontal Scroll Filters */}
      <nav className="sticky top-0 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200 z-40 py-4 shadow-sm">
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
                whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border
                ${activeFilter === option 
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-md ring-2 ring-[#5A5A40]/10' 
                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeFilter === 'Todos los modelos' ? (
            /* CASE A: Summary Cards (3 Models) */
            <motion.div
              key="summary-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {MODELS.map((model) => (
                <div 
                  key={model.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col group h-full"
                >
                  <div 
                    className="relative aspect-[4/3] flex items-center justify-center text-8xl"
                    style={{ backgroundColor: `${model.color}10` }}
                  >
                    <img 
                      src={model.image} 
                      alt=""
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5]"
                    />
                    <span className="relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">
                      {model.emoji}
                    </span>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow bg-white relative">
                    <h3 className="font-serif text-3xl text-stone-800 mb-4">{model.name}</h3>
                    
                    <div className="space-y-3 mb-10 text-stone-500 font-medium italic">
                      <p className="text-sm flex items-center gap-3">
                        <Utensils size={16} className="text-stone-300" />
                        Tamaños: {model.sizes.join(', ')}
                      </p>
                      <p className="text-sm flex items-center gap-3">
                        <BookOpen size={16} className="text-stone-300" />
                        Páginas: {model.pageRange}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveFilter(model.name)}
                      className="mt-auto w-full min-h-[52px] bg-stone-100 hover:bg-stone-200 text-[#5A5A40] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      Ver variantes de este modelo
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            /* CASE B: Detailed View for a Specific Model */
            <motion.div
              key="details-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-10"
            >
              {/* Back button */}
              <div className="flex justify-start">
                <button 
                  onClick={() => setActiveFilter('Todos los modelos')}
                  className="flex items-center gap-2 text-stone-400 hover:text-stone-600 font-medium transition-colors py-2 px-1 focus:outline-none"
                >
                  <ChevronLeft size={20} />
                  Volver a todos los modelos
                </button>
              </div>

              {/* Featured Model Header */}
              {selectedModel && (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="mb-8"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-[2rem] overflow-hidden shadow-lg border-4 border-white mb-6 bg-stone-50 flex items-center justify-center text-7xl active:scale-95 transition-transform duration-300">
                      <img 
                        src={selectedModel.image} 
                        alt={selectedModel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-serif text-3xl text-stone-800 mb-2">
                      {selectedModel.name} - Diseño principal
                    </h2>
                    <p className="text-stone-500 font-medium italic">
                      Todas las versiones disponibles del {selectedModel.name}
                    </p>
                  </motion.div>

                  {/* Variants Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {selectedModel.variants.map((variant) => (
                      <div 
                        key={variant.id}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col sm:flex-row gap-5 items-center text-center sm:text-left hover:shadow-md transition-shadow"
                      >
                        {/* Smaller variant icon/image */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-stone-50 flex items-center justify-center text-4xl shadow-inner border border-stone-100 relative overflow-hidden">
                          <img 
                            src={selectedModel.image} 
                            alt=""
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                          />
                          <span className="relative z-10">{selectedModel.emoji}</span>
                        </div>
                        
                        <div className="flex-grow w-full space-y-4">
                          <div className="space-y-1">
                            <p className="text-stone-400 uppercase tracking-widest text-[10px] font-bold">Variante</p>
                            <h4 className="font-serif text-lg text-stone-800 leading-tight">
                              Tamaño: {variant.size}
                            </h4>
                            <p className="text-[#A0522D] font-bold italic text-sm">
                              {variant.pages} páginas
                            </p>
                          </div>
                          
                          <button
                            onClick={() => handleAmazonClick(`${selectedModel.name} (${variant.size}, ${variant.pages} págs)`)}
                            className="min-h-[48px] w-full bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
                          >
                            <ShoppingCart size={16} />
                            Ver en Amazon
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#FAFAF9] border-t border-stone-200 mt-20 py-16 px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h4 className="flex items-center justify-center gap-2 text-stone-300 font-bold uppercase tracking-[0.2em] text-[10px]">
              <Mail size={16} />
              ¿Sugerencias?
            </h4>
            <a 
              href="mailto:misrecetas@diarios.com" 
              className="text-[#A0522D] hover:underline font-serif italic text-xl decoration-stone-200 block"
            >
              misrecetas@diarios.com
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <button 
              onClick={() => alert("Enlace a Instagram")}
              className="w-14 h-14 rounded-[1.25rem] bg-stone-50 text-[#5A5A40] flex items-center justify-center hover:bg-white hover:shadow-md transition-all border border-stone-100"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </button>
            <button 
              onClick={() => alert("Enlace a Pinterest")}
              className="w-14 h-14 rounded-[1.25rem] bg-stone-50 text-[#5A5A40] flex items-center justify-center hover:bg-white hover:shadow-md transition-all border border-stone-100"
              aria-label="Pinterest"
            >
              <Pinterest size={24} />
            </button>
          </div>

          <div className="pt-10 border-t border-stone-100">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-medium">
             © 2026 Diarios de Recetas • Hecho con amor en la cocina
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Interaction Helper */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => alert("Desliza los filtros o selecciona un modelo para ver todas sus versiones.")}
          className="w-12 h-12 rounded-2xl bg-[#5A5A40] shadow-xl text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Info size={20} />
        </button>
      </div>
    </div>
  );
}
