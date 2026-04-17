/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Instagram, 
  Pin as Pinterest, 
  ChevronLeft,
  Mail,
  Book,
  Utensils
} from 'lucide-react';

// --- Types ---
interface Model {
  id: number;
  name: string;
  image: string;
  color: string;
  emoji: string;
}

// --- Data ---
const MODELS: Model[] = [
  {
    id: 1,
    name: 'Modelo 1',
    image: 'https://i.ibb.co/pBdM3rJK/1-modelo-recetas.jpg',
    color: '#A0522D', // Terracotta
    emoji: '🍲'
  },
  {
    id: 2,
    name: 'Modelo 2',
    image: 'https://i.ibb.co/0Vq1Wfxz/2-modelo-recetas.jpg',
    color: '#5A5A40', // Olive
    emoji: '🥘'
  },
  {
    id: 3,
    name: 'Modelo 3',
    image: 'https://i.ibb.co/QjtQSm2b/3-modelo-recetas.jpg',
    color: '#8B4513', // Brown
    emoji: '👩‍🍳'
  }
];

const FORMATS = ['6x9', '8x10', '8.5x11'];
const PAGES = [102, 122, 132, 152, 202];

// --- Components ---

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800 selection:bg-[#A0522D]/20 relative overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-50"></div>

      {/* Top Banner Message */}
      <div className="bg-[#A0522D] text-[#FAFAF9] py-2 px-4 shadow-sm relative z-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-center flex items-center justify-center gap-1.5 leading-none">
          ✨ ¿Buscas más páginas? Hasta 202 disponibles
        </p>
      </div>

      {children}

      {/* Footer Section */}
      <footer className="bg-[#FAFAF9] border-t border-stone-200 mt-20 py-16 px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
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
              className="w-14 h-14 rounded-2xl bg-stone-50 text-[#5A5A40] flex items-center justify-center hover:bg-white hover:shadow-md transition-all border border-stone-100"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </button>
            <button 
              onClick={() => alert("Enlace a Pinterest")}
              className="w-14 h-14 rounded-2xl bg-stone-50 text-[#5A5A40] flex items-center justify-center hover:bg-white hover:shadow-md transition-all border border-stone-100"
              aria-label="Pinterest"
            >
              <Pinterest size={24} />
            </button>
          </div>

          <div className="pt-10 border-t border-stone-100 italic text-[10px] uppercase tracking-[0.3em] text-stone-300 font-medium">
             © 2026 Diarios de Recetas • Cultivando Momentos
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page 1: Home ---
const HomePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <header className="text-center mb-16">
        <h1 className="font-serif text-3xl md:text-5xl text-[#5A5A40] mb-4 tracking-tight">
          DIARIOS DE RECETAS
        </h1>
        <p className="font-serif italic text-[#A0522D] text-xl">
          Elige un modelo
        </p>
        <div className="w-16 h-0.5 bg-stone-200 mx-auto mt-6"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MODELS.map((model) => (
          <div key={model.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col group h-full transition-all hover:shadow-md">
            <div className="relative aspect-square flex items-center justify-center text-8xl bg-stone-100 overflow-hidden">
              <img 
                src={model.image} 
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-8 text-center flex flex-col flex-grow">
              <h3 className="font-serif text-2xl text-stone-800 mb-6">{model.name}</h3>
              <Link 
                to={`/modelo/${model.id}`}
                className="mt-auto block w-full py-4 bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold rounded-2xl transition-all active:scale-95 shadow-sm"
              >
                Ver formatos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Page 2: Model Formats ---
const ModelFormatsPage = () => {
  const { modeloId } = useParams();
  const navigate = useNavigate();
  const model = MODELS.find(m => m.id === Number(modeloId));

  if (!model) return <div className="p-20 text-center">Modelo no encontrado</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-stone-400 hover:text-stone-600 font-medium transition-colors mb-12"
      >
        <ChevronLeft size={20} />
        Volver
      </button>

      <div className="text-center mb-12">
        <div className="w-40 h-40 mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-8 bg-white flex items-center justify-center text-7xl">
          <img 
            src={model.image} 
            alt={model.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="font-serif text-4xl text-stone-800 mb-2">{model.name}</h2>
        <p className="text-[#A0522D] font-serif italic text-xl">Elige el formato</p>
      </div>

      <div className="space-y-4">
        {FORMATS.map((format) => (
          <Link 
            key={format}
            to={`/modelo/${model.id}/formato/${format}`}
            className="block p-6 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl text-white">
                  <Book size={24} />
                </div>
                <span className="font-serif text-xl">{format} pulgadas</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                <ArrowRightIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

// --- Page 3: Format Pages ---
const FormatPagesPage = () => {
  const { modeloId, formatoId } = useParams();
  const navigate = useNavigate();
  const model = MODELS.find(m => m.id === Number(modeloId));

  if (!model) return <div className="p-20 text-center">Modelo no encontrado</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      <button 
        onClick={() => navigate(`/modelo/${modeloId}`)}
        className="flex items-center gap-2 text-stone-400 hover:text-stone-600 font-medium transition-colors mb-12"
      >
        <ChevronLeft size={20} />
        Volver
      </button>

      <div className="text-center mb-12">
        <div className="w-40 h-40 mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-8 bg-white flex items-center justify-center text-7xl">
          <img 
            src={model.image} 
            alt={model.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">{model.name} - Formato {formatoId}</h2>
        <p className="text-[#A0522D] font-serif italic text-xl">Elige el número de páginas</p>
      </div>

      <div className="space-y-4">
        {PAGES.map((pages) => (
          <button 
            key={pages}
            onClick={() => alert(`Comprar: ${model.name} - Formato ${formatoId} - ${pages} páginas. Enlace Amazon: (sustituir por URL real)`)}
            className="w-full p-6 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
          >
            <span className="font-serif text-lg">{pages} páginas</span>
            <div className="flex items-center gap-2 text-white/70 font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Comprar <ShoppingCart size={16} />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

// --- App Entry Point ---

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modelo/:modeloId" element={<ModelFormatsPage />} />
            <Route path="/modelo/:modeloId/formato/:formatoId" element={<FormatPagesPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
