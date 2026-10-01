import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ZoomIn, Calendar } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/barberData';
import { GalleryImage } from '../types';

interface GalleryProps {
  onOpenBooking: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Trabalhos' },
    { id: 'cortes', label: 'Cortes & Fades' },
    { id: 'barba', label: 'Barba na Navalha' },
    { id: 'pigmentacao', label: 'Pigmentação' },
    { id: 'ambiente', label: 'A Barbearia' },
    { id: 'detalhes', label: 'Lâminas & Detalhes' },
  ];

  const filteredItems =
    activeCategory === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="galeria" className="relative py-24 sm:py-32 bg-[#06070a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
            <Camera className="w-3.5 h-3.5 text-[#E31837]" />
            <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
              PORTFÓLIO DE BANCADA
            </span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-2">
            GALERIA DE ESTILOS &{' '}
            <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
              acabamento
            </span>
          </h2>

          <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Nitidez real do degradê navalhado, barboterapia e pigmentação. Sem filtros, no mais alto padrão de precisão em Cascavel - CE.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#E31837] text-white shadow-lg shadow-[#E31837]/35 ring-1 ring-white/20'
                    : 'bg-[#10141f] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#0e1219] border border-white/10 hover:border-[#F5E6C8]/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('bigode_sobrancelha')) {
                      target.src = '/images/bigode_sobrancelha_1790794950792.jpg';
                    }
                  }}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs font-['Bebas_Neue'] tracking-widest text-[#F5E6C8] uppercase">
                  {item.tag}
                </span>
                <h4 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide uppercase mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center space-x-1.5 text-xs text-zinc-300 font-['Raleway']">
                  <ZoomIn className="w-4 h-4 text-[#E31837]" />
                  <span>Clique para ampliar foto</span>
                </div>
              </div>

              {/* Static Corner Tag */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-['Bebas_Neue'] tracking-wider uppercase text-[#F5E6C8] border border-white/10 group-hover:opacity-0 transition-opacity">
                {item.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#0c1018] rounded-2xl overflow-hidden border border-[#F5E6C8]/25 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-[#E31837] text-white transition-colors cursor-pointer"
                aria-label="Fechar visualização"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[70vh] mx-auto"
                />
              </div>

              <div className="p-6 bg-[#090b10] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-xs uppercase font-['Bebas_Neue'] tracking-widest text-[#F5E6C8]">
                    {selectedImage.tag}
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide uppercase mt-0.5">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-['Raleway']">
                    Trabalho autoral executado pela equipe da Barbearia Navalha em Cascavel - CE.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-base tracking-widest uppercase transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>QUERO ESSE ESTILO</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
