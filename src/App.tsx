import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { BookingSection } from './components/BookingSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { ServiceItem } from './types';
import { SERVICES } from './data/barberData';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      const match = SERVICES.find((s) => s.id === serviceId);
      if (match) setSelectedService(match);
    }
    setIsModalOpen(true);
  };

  const handleSelectServiceFromCard = (service: ServiceItem) => {
    setSelectedService(service);
    const bookingEl = document.getElementById('agendamento');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleExploreServices = () => {
    const servicesEl = document.getElementById('servicos');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f1f3f7] flex flex-col font-['Raleway'] selection:bg-[#E31837] selection:text-white overflow-x-hidden">
      {/* Fixed Header with Top Barber Pole Accent */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Início / Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Serviços de Bancada: Cabelo, Barba, Sobrancelha, Pigmentação, Luzes */}
        <Services
          onSelectService={handleSelectServiceFromCard}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 3. Sobre Nós: O Atendimento que Você Merece & Barbeiros */}
        <About />

        {/* 4. Galeria de Estilos & Acabamentos */}
        <Gallery onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Agendamento de Horário Interativo */}
        <BookingSection preselectedService={selectedService} />

        {/* 6. Onde Estamos Localizados? / Contato Oficial Cascavel - CE */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Persistent Floating WhatsApp with Pulse */}
      <FloatingWhatsApp />

      {/* Modal Dialog for Instant Booking */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedService={selectedService}
      />
    </div>
  );
}
