import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  Clock, 
  Scissors, 
  Tag, 
  CheckCircle, 
  Sparkles,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Camera,
  RefreshCw,
  Check
} from 'lucide-react';
import { COMFORT_FEATURES, BUSINESS_INFO } from '../data/barberData';

const STORAGE_KEY = 'barbearia_navalha_real_photo_img';

/**
 * ============================================================================
 * FOTO REAL DA BARBEARIA (SEM IA / SEM FILTROS ARTIFICIAIS):
 * 
 * Se você tiver o caminho estático de uma foto real, defina em CUSTOM_ABOUT_IMAGE.
 * Caso contrário, você pode carregar diretamente pelo botão ou arrastar para a área.
 * A foto é salva permanentemente no servidor (/images/foto_real_barbearia.jpg).
 * ============================================================================
 */
export const CUSTOM_ABOUT_IMAGE = '';

export const About: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
      } catch (err) {
        console.warn('Erro ao ler localStorage:', err);
      }
    }
    return CUSTOM_ABOUT_IMAGE;
  });

  const [urlInput, setUrlInput] = useState<string>('');
  const [isUrlModalOpen, setIsUrlModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with server on mount: check if server has the real image or sync browser localStorage
  useEffect(() => {
    fetch('/api/barbershop-image')
      .then((res) => res.json())
      .then((data) => {
        if (data.exists && data.url) {
          setCurrentImage(data.url);
          try {
            localStorage.setItem(STORAGE_KEY, data.url);
          } catch {}
          return;
        }

        // If server doesn't have it yet, check if browser has a cached photo to upload
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached && cached.startsWith('data:image/')) {
            setCurrentImage(cached);
            fetch('/api/save-barbershop-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageBase64: cached }),
            })
              .then((r) => r.json())
              .then((resp) => {
                if (resp.url) {
                  setCurrentImage(resp.url);
                }
              })
              .catch((err) => console.warn('Erro ao sincronizar foto com o servidor:', err));
          }
        }
      })
      .catch((err) => console.warn('Erro ao checar imagem no servidor:', err));
  }, []);

  const saveImageToServer = async (base64Url: string) => {
    setIsSaving(true);
    setCurrentImage(base64Url);
    try {
      localStorage.setItem(STORAGE_KEY, base64Url);
    } catch (e) {
      console.warn('Erro ao gravar localStorage:', e);
    }

    try {
      const res = await fetch('/api/save-barbershop-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Url }),
      });
      const data = await res.json();
      if (data.url) {
        setCurrentImage(data.url);
        try {
          localStorage.setItem(STORAGE_KEY, data.url);
        } catch {}
        setStatusMessage('Foto real salva e atualizada com sucesso no site!');
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err) {
      console.error('Falha ao enviar foto para o servidor:', err);
      setStatusMessage('Foto carregada na tela (salva localmente).');
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        saveImageToServer(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      const newUrl = urlInput.trim();
      setCurrentImage(newUrl);
      try {
        localStorage.setItem(STORAGE_KEY, newUrl);
      } catch (err) {
        console.warn('Erro ao salvar URL:', err);
      }
      setIsUrlModalOpen(false);
      setStatusMessage('URL da foto aplicada com sucesso!');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleResetToDefault = () => {
    setCurrentImage(CUSTOM_ABOUT_IMAGE);
    setUrlInput('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Erro ao limpar localStorage:', err);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setStatusMessage('Área liberada para envio de nova foto.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <section id="sobre" className="relative py-20 sm:py-28 bg-[#06070a] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E31837]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header: Objetivo, Local e Acessível */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
              <Scissors className="w-3.5 h-3.5 text-[#E31837]" />
              <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
                BARBEARIA LOCAL • CENTRO DE CASCAVEL
              </span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-3">
              CORTE NA RÉGUA,{' '}
              <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
                preço acessível e atendimento individual
              </span>
            </h2>

            <div className="space-y-3.5 font-['Raleway'] text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">Barbearia Navalha</strong> é um espaço novo no Centro de Cascavel - CE, pensado para quem quer cortar o cabelo e fazer a barba com capricho, preço acessível e atendimento individual.
              </p>
              <p className="text-zinc-400">
                Nosso trabalho é direto e bem feito: degradê na zero bem disfarçado, corte social alinhado, barba desenhada na navalha, sobrancelha e platinado. Atendemos com técnica e atenção ao que você pede.
              </p>
              <p className="text-zinc-400">
                Atendimento com praticidade: você pode agendar seu horário com facilidade pelo WhatsApp ou ser atendido por ordem de chegada com total conforto.
              </p>
            </div>

            {/* Core Pillars - Objetivos e Reais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#E31837] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Navalhas 100% Descartáveis
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Lâminas novas abertas na sua frente a cada cliente com higiene garantida.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#F5E6C8] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Toalha Aquecida & Lavagem
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Ritual com toalha aquecida relaxante para abrir os poros e lavagem refrescante para sair pronto.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#F5E6C8] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Agendamento & Ordem de Chegada
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Agende previamente o seu horário ou venha direto para ser atendido.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Tag className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Preço Acessível de Verdade
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Tabela de valores acessível para manter seu visual sempre alinhado.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Ambiente Novo & Limpo
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Espaço organizado, bem ventilado e com recepção amigável.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Developer Custom Image Slot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 bg-[#0d1017] p-2 sm:p-3 shadow-2xl ${
                isDragging ? 'border-[#E31837] ring-2 ring-[#E31837]/50 scale-[1.01]' : 'border-white/10'
              }`}
            >
              {/* Status Toast */}
              {statusMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-['Raleway'] flex items-center space-x-1.5 shadow-2xl backdrop-blur-md animate-fade-in">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-[#090c13] flex flex-col items-center justify-center border border-white/5">
                {isSaving && (
                  <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="w-7 h-7 text-[#E31837] animate-spin" />
                    <p className="text-xs text-white font-['Bebas_Neue'] tracking-wider uppercase">
                      Salvando foto real no site...
                    </p>
                  </div>
                )}

                {currentImage ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={currentImage}
                      alt="Foto Real da Barbearia Navalha"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Developer / User overlay controls on hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 backdrop-blur-md rounded-lg p-1.5 flex items-center space-x-1.5 border border-white/15 shadow-xl">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs bg-white/15 hover:bg-white/25 text-white rounded font-['Raleway'] flex items-center space-x-1 transition-colors cursor-pointer"
                        title="Substituir por outra foto real"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Trocar Foto</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="p-1 text-zinc-400 hover:text-red-400 rounded transition-colors cursor-pointer"
                        title="Remover foto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  /* Área Aberta para Foto Real */
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-700/80 hover:border-[#E31837]/60 rounded-lg transition-all bg-gradient-to-b from-[#0e131d]/70 to-[#07090e]/90">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-[#E31837] mb-4 shadow-lg">
                      <Camera className="w-8 h-8" />
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E31837]/15 border border-[#E31837]/30 text-[#E31837] text-[11px] font-['Bebas_Neue'] tracking-wider uppercase mb-2">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>FOTO REAL DO SALÃO</span>
                    </div>

                    <h4 className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-white tracking-wider uppercase">
                      ESPAÇO DA SUA FOTO REAL
                    </h4>

                    <p className="text-xs text-zinc-400 font-['Raleway'] max-w-xs mt-1.5 leading-relaxed">
                      Selecione a foto real da barbearia. A imagem é salva e mantida permanentemente no site (sem qualquer filtro de IA).
                    </p>

                    {/* Controles para carregar imagem real */}
                    <div className="mt-5 w-full max-w-xs space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-[#E31837] hover:bg-[#c9142e] text-white font-['Bebas_Neue'] tracking-wider uppercase text-sm transition-all shadow-lg shadow-[#E31837]/25 cursor-pointer active:scale-[0.98]"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Carregar Foto Real do Computador</span>
                      </button>

                      {!isUrlModalOpen ? (
                        <button
                          type="button"
                          onClick={() => setIsUrlModalOpen(true)}
                          className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white font-['Raleway'] text-xs transition-colors border border-white/5 cursor-pointer"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          <span>Ou colar link direto da foto</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1.5 pt-1">
                          <input
                            type="url"
                            placeholder="https://... ou /images/sua-foto.jpg"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyUrl()}
                            className="flex-1 bg-black/70 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E31837]"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleApplyUrl}
                            className="px-3 py-1.5 bg-[#E31837] text-white rounded-lg text-xs font-['Bebas_Neue'] tracking-wider uppercase hover:bg-[#c9142e] transition-colors cursor-pointer"
                          >
                            OK
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsUrlModalOpen(false)}
                            className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 w-full max-w-xs flex items-center justify-center space-x-2 text-[10px] text-zinc-500 font-['Raleway']">
                      <span>Arraste e solte o arquivo aqui</span>
                      <span>•</span>
                      <span>JPG, PNG ou WebP</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações da Barbearia abaixo da imagem */}
              <div className="pt-3 pb-1 px-3 flex items-center justify-between">
                <div>
                  <p className="font-['Bebas_Neue'] text-xl text-white tracking-wider uppercase leading-none">
                    NOSSO SALÃO
                  </p>
                  <p className="text-xs text-zinc-400 font-['Raleway'] mt-0.5">
                    Ambiente limpo, organizado e climatizado • Cascavel - CE
                  </p>
                </div>
                <span className={`text-[11px] font-['Bebas_Neue'] tracking-widest uppercase px-2.5 py-1 rounded border ${
                  currentImage 
                    ? 'bg-[#E31837]/20 text-[#E31837] border-[#E31837]/30'
                    : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60'
                }`}>
                  {currentImage ? 'Foto Real' : 'Aguardando Foto'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-['Bebas_Neue'] tracking-[0.2em] text-[#E31837]">
              POR QUE CORTAR AQUI
            </span>
            <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wider uppercase mt-1">
              O QUE VOCÊ ENCONTRA NA NOSSA BARBEARIA
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-['Raleway'] mt-1">
              Compromisso simples com o seu visual, seu tempo e o seu bolso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMFORT_FEATURES.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-[#0c1017] border border-white/10 overflow-hidden group hover:border-[#F5E6C8]/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('bigode_sobrancelha')) {
                        target.src = '/images/bigode_sobrancelha_1790794950792.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/30 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-[#E31837] text-white px-2.5 py-1 rounded text-[10px] font-['Bebas_Neue'] tracking-wider uppercase shadow-md">
                    {item.highlight}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-xl text-white tracking-wider uppercase mb-1.5 group-hover:text-[#F5E6C8] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-['Raleway'] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-['Bebas_Neue'] tracking-wider uppercase text-zinc-400">
                      Cascavel - CE
                    </span>
                    <span className="text-[#F5E6C8] font-['Bebas_Neue'] tracking-wider">
                      Centro
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
