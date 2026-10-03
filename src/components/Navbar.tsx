import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, Clock, MapPin, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';
import { NavalhaLogo } from './NavalhaLogo';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Dicas de Barba', href: '#dicas' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Agendamento', href: '#agendamento' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Barber Pole Accent Top Stripe */}
      <div className="fixed top-0 left-0 right-0 h-1.5 barber-stripe z-50 shadow-sm" />

      {/* Top micro bar for authority info */}
      <div className="fixed top-1.5 left-0 right-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-white/5 text-xs text-zinc-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-zinc-300 font-['Raleway']">
              <MapPin className="w-3.5 h-3.5 text-[#E31837]" />
              <span>{BUSINESS_INFO.address}</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#F5E6C8] font-['Raleway']">
              <Clock className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>Seg a Sáb: 08h às 19h • Dom: 08h às 12h</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#F5E6C8] font-['Bebas_Neue'] text-sm tracking-wider">
                ESTAMOS FUNCIONANDO HOJE
              </span>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-zinc-200 hover:text-white flex items-center space-x-1 font-semibold transition-colors font-['Raleway']"
            >
              <Phone className="w-3.5 h-3.5 text-[#E31837]" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`fixed left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'top-1.5 bg-[#06080d]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'top-1.5 md:top-8 bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#inicio"
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative w-11 h-11 transition-transform group-hover:scale-105 duration-300">
                <NavalhaLogo className="w-full h-full drop-shadow-md" />
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-['Bebas_Neue'] text-3xl tracking-widest text-white uppercase leading-none">
                    BARBEARIA NAVALHA
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E31837]" />
                </div>
                <p className="text-[10px] tracking-[0.25em] text-[#F5E6C8] uppercase font-['Bebas_Neue']">
                  TRADIÇÃO, ESTILO E ATITUDE.
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs uppercase font-['Bebas_Neue'] tracking-widest text-zinc-300 hover:text-[#F5E6C8] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#E31837] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="hidden xl:flex items-center space-x-2 text-xs font-['Bebas_Neue'] tracking-wider uppercase px-3 py-2 rounded border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E31837]" />
                <span>LIGAR</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="relative group overflow-hidden px-5 py-2.5 rounded bg-[#E31837] hover:bg-[#b9102b] text-white text-base font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#E31837]/30 hover:shadow-[#E31837]/50 active:scale-95 flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>AGENDE SEU HORÁRIO</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                onClick={() => onOpenBooking()}
                className="bg-[#E31837] text-white px-3 py-1.5 rounded text-xs font-['Bebas_Neue'] tracking-wider uppercase"
              >
                AGENDAR
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#141824] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Abrir menu de navegação"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[56px] z-30 bg-[#0a0d14]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 sm:hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase font-['Bebas_Neue'] tracking-widest text-[#E31837]">
                  BARBEARIA NAVALHA
                </span>
                <span className="text-xs text-[#F5E6C8] font-['Raleway']">Cascavel - CE</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-['Bebas_Neue'] tracking-wider uppercase text-zinc-200 hover:text-[#E31837] py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-[#E31837] text-white text-center font-['Bebas_Neue'] text-lg uppercase tracking-widest rounded shadow-md"
                >
                  AGENDE SEU HORÁRIO
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full py-2.5 bg-[#141824] border border-white/10 text-zinc-200 text-center font-['Bebas_Neue'] text-sm tracking-wider uppercase rounded flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#E31837]" />
                  <span>{BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
