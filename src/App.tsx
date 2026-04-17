/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Instagram, 
  Pin as Pinterest, 
  ChevronLeft,
  ChevronRight,
  Mail,
  Home,
  Target,
  Maximize,
  LayoutGrid
} from 'lucide-react';

// --- Types ---
interface Model {
  id: number;
  name: string;
  image: string;
  description: string;
}

// --- Data ---
const MODELS: Model[] = [
  {
    id: 1,
    name: 'Modelo 1',
    image: 'https://i.ibb.co/pBdM3rJK/1-modelo-recetas.jpg',
    description: 'Diseño clásico. Perfecto para recetas tradicionales.'
  },
  {
    id: 2,
    name: 'Modelo 2',
    image: 'https://i.ibb.co/0Vq1Wfxz/2-modelo-recetas.jpg',
    description: 'Diseño moderno. Ideal para recetas creativas y fusión.'
  },
  {
    id: 3,
    name: 'Modelo 3',
    image: 'https://i.ibb.co/QjtQSm2b/3-modelo-recetas.jpg',
    description: 'Diseño rústico. Para los amantes de la cocina casera.'
  }
];

const RANDOM_PHRASES = [
  "Cocinar es amor hecho visible. ¿Qué receta guardarás hoy?",
  "Cada página en blanco es una nueva aventura en tu cocina.",
  "Tus mejores recetas merecen un lugar especial.",
  "Un diario de recetas es el legado de los sabores que amas.",
  "La cocina es el corazón del hogar. Llena estas páginas de vida."
];

const FORMATS = ['6x9', '8x10', '8.5x11'];
const PAGES = [102, 122, 132, 152, 202];

// --- Components ---

const Breadcrumb = () => {
  const { modeloId, formatoId } = useParams();
  const location = useLocation();
  const model = MODELS.find(m => m.id === Number(modeloId));

  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center gap-2 text-stone-400 text-xs md:text-sm font-medium mb-6 flex-wrap">
      <Link to="/" className="hover:text-[#A0522D] transition-colors flex items-center gap-1">
        Inicio
      </Link>
      
      {modeloId && (
        <>
          <ChevronRight size={14} className="text-stone-300" />
          {formatoId ? (
            <Link to={`/modelo/${modeloId}`} className="hover:text-[#A0522D] transition-colors">
              {model?.name || `Modelo ${modeloId}`}
            </Link>
          ) : (
            <span className="text-stone-600 font-bold">{model?.name || `Modelo ${modeloId}`}</span>
          )}
        </>
      )}

      {formatoId && (
        <>
          <ChevronRight size={14} className="text-stone-300" />
          <span className="text-stone-600 font-bold">Formato {formatoId}</span>
        </>
      )}
    </nav>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-stone-800 selection:bg-[#A0522D]/20 relative overflow-x-hidden flex flex-col">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-50"></div>

      <div className="flex-grow flex flex-col relative z-30">
        {children}
      </div>

      {/* Footer Section */}
      <footer className="bg-[#FAFAF9] border-t border-stone-200 py-16 px-8 relative z-40 text-center mt-auto">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="pb-6">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-stone-100 hover:bg-stone-200 text-[#5A5A40] font-bold rounded-full transition-all active:scale-95 shadow-sm text-sm"
            >
              <Home size={18} />
              Volver al inicio
            </button>
          </div>

          <a 
            href="https://taplink.cc/victoriamaciass"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="group space-y-6 flex flex-col items-center inline-block"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-24 h-24 rounded-full overflow-hidden shadow-md border-2 border-stone-200 bg-stone-50 transition-shadow group-hover:shadow-lg"
            >
              <img 
                src="https://i.ibb.co/zC2K7nK/victoria-maciass.jpg" 
                alt="Victoria Maciass"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="space-y-2">
              <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-[#A0522D] transition-colors">
                Victoria Maciass
              </span>
            </div>
          </a>

          <div className="pt-10 border-t border-stone-100 italic text-[10px] uppercase tracking-[0.3em] text-stone-300 font-medium font-serif">
             © 2026 DIARIOS DE RECETAS • CULTIVANDO MOMENTOS
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page 1: Home ---
const HomePage = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_PHRASES.length);
    setPhrase(RANDOM_PHRASES[randomIndex]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 py-16 w-full"
    >
      <header className="text-center mb-16">
        <h1 className="font-serif text-3xl md:text-5xl text-[#5A5A40] mb-4 tracking-tight">
          📖 DIARIOS DE RECETAS
        </h1>
        <p className="text-[#A0522D] font-serif text-xl md:text-2xl mb-4">
          Elige el modelo que más te inspire
        </p>
        <p className="italic text-stone-400 font-serif max-w-lg mx-auto text-lg leading-relaxed">
          "{phrase}"
        </p>
        <div className="w-16 h-0.5 bg-stone-200 mx-auto mt-10"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {MODELS.map((model) => (
          <div key={model.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col group h-full transition-all hover:shadow-md">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={model.image} 
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
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

  if (!model) return <div className="p-20 text-center font-serif text-xl">Modelo no encontrado</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      <Breadcrumb />
      
      {/* Quick Actions Nivel 2 */}
      <div className="flex gap-3 mb-12">
        <button 
          onClick={() => navigate('/')}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-bold hover:border-[#A0522D] transition-colors shadow-sm"
        >
          <Target size={14} className="text-[#A0522D]" />
          Cambiar de modelo
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-bold hover:border-stone-400 transition-colors shadow-sm"
        >
          <ChevronLeft size={14} />
          Atrás
        </button>
      </div>

      <div className="text-center mb-16">
        <div className="w-[200px] h-[200px] mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-10 bg-white">
          <img 
            src={model.image} 
            alt={model.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="font-serif text-4xl text-stone-800 mb-4">{model.name}</h2>
        <p className="text-stone-500 italic text-lg mb-8">
          {model.description}
        </p>
        <h3 className="text-xl font-serif text-[#A0522D] opacity-80 uppercase tracking-widest text-sm font-bold">Elige el formato de tu diario</h3>
      </div>

      <div className="space-y-4">
        {FORMATS.map((format) => (
          <Link 
            key={format}
            to={`/modelo/${model.id}/formato/${format}`}
            className="block p-7 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl">{format} pulgadas</span>
              <ChevronRight size={20} className="text-white/50 group-hover:translate-x-1 transition-transform" />
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

  if (!model) return <div className="p-20 text-center font-serif text-xl font-bold">Modelo no encontrado</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      <Breadcrumb />

      {/* Quick Actions Nivel 3 */}
      <div className="flex gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => navigate('/')}
          className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-bold hover:border-[#A0522D] transition-colors shadow-sm"
        >
          <Target size={14} className="text-[#A0522D]" />
          Otro modelo
        </button>
        <button 
          onClick={() => navigate(`/modelo/${modeloId}`)}
          className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-bold hover:border-[#5A5A40] transition-colors shadow-sm"
        >
          <LayoutGrid size={14} className="text-[#5A5A40]" />
          Otro formato
        </button>
        <button 
          onClick={() => navigate(`/modelo/${modeloId}`)}
          className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-bold hover:border-stone-400 transition-colors shadow-sm"
        >
          <ChevronLeft size={14} />
          Atrás
        </button>
      </div>

      <div className="text-center mb-16">
        <div className="w-[200px] h-[200px] mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-10 bg-white">
          <img 
            src={model.image} 
            alt={model.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">{model.name} - {formatoId}</h2>
        <p className="text-[#A0522D] font-serif italic text-lg mb-8 leading-relaxed">
          Más páginas, más recetas. Elige la que mejor se adapte a tu ritmo.
        </p>
        <h3 className="text-2xl font-serif text-[#5A5A40] opacity-80 uppercase tracking-widest text-sm font-bold">¿Cuántas páginas necesitas?</h3>
      </div>

      <div className="space-y-4">
        {PAGES.map((pages) => (
          <button 
            key={pages}
            onClick={() => alert(`Comprar: ${model.name} - Formato ${formatoId} - ${pages} páginas`)}
            className="w-full p-6 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
          >
            <span className="font-serif text-xl">{pages} páginas</span>
            <div className="flex items-center gap-2 text-white/50 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Seleccionar <ShoppingCart size={16} />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

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
