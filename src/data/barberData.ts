import { ServiceItem, ComfortFeature, GalleryImage } from '../types';
import bigodeImg from '../assets/images/bigode_sobrancelha_1790794950792.jpg';
import luzesImg from '../assets/images/luzes_alinhado_1790794918959.jpg';
import nevouImg from '../assets/images/nevou_platinado_1790794940340.jpg';
import toalhaQuenteImg from '../assets/images/toalha_quente_barba_1790879781128.jpg';
import sobrancelhaImg from '../assets/images/sobrancelha_navalha_1790879795042.jpg';
import hidratacaoImg from '../assets/images/hidratacao_capilar_1790879806407.jpg';
import matizacaoImg from '../assets/images/matizacao_violeta_1790879821311.jpg';
import hidrataMatizaImg from '../assets/images/cabelo_platinado_sedoso_1790879835342.jpg';
import comboPremiumImg from '../assets/images/combo_cabelo_barba_1790879854927.jpg';
import barbaSimplesImg from '../assets/images/barba_simples_navalha_1790879870229.jpg';

export {
  bigodeImg,
  luzesImg,
  nevouImg,
  toalhaQuenteImg,
  sobrancelhaImg,
  hidratacaoImg,
  matizacaoImg,
  hidrataMatizaImg,
  comboPremiumImg,
  barbaSimplesImg
};

export const BUSINESS_INFO = {
  name: 'Barbearia Navalha',
  tagline: 'Barbearia Local • Preço Acessível e Atendimento Individual',
  headline: 'Corte de qualidade, preço acessível e atendimento individual.',
  subheadline: 'Cascavel - CE • A sua barbearia no Centro de Cascavel. Espaço novo, lâminas descartáveis, atendimento pontual e valores acessíveis para você manter o visual sempre em dia.',
  phoneFormatted: '(85) 99156-4729',
  phoneRaw: '5585991564729',
  address: 'R. Prof. José Antônio de Queiroz, 1972 - Centro, Cascavel - CE, 62850-000',
  shortAddress: 'Centro, Cascavel - CE',
  hours: 'Segunda a Sábado: 08:00 - 19:00 | Domingo: 08:00 - 12:00',
  hoursDetail: [
    { days: 'Segunda-feira', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Terça-feira', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Quarta-feira', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Quinta-feira', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Sexta-feira', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Sábado', time: '08:00 - 19:00', status: 'Aberto' },
    { days: 'Domingo', time: '08:00 - 12:00', status: 'Aberto' },
  ],
  googleMapsUrl: 'https://maps.google.com/?q=R.+Prof.+Jos%C3%A9+Ant%C3%B4nio+de+Queiroz,+1972+-+Centro,+Cascavel+-+CE,+62850-000',
  instagram: '@barbearianavalha.ce',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'corte-simples',
    name: 'Corte Simples',
    category: 'cabelo',
    price: 30,
    duration: '30 min',
    description: 'Corte social ou tradicional na máquina e tesoura com acabamento na navalha.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    features: [],
    isPopular: false
  },
  {
    id: 'corte-premium',
    name: 'Corte Premium',
    category: 'cabelo',
    price: 40,
    duration: '40 min',
    description: 'Degradê navalhado, lavagem capilar e finalização com pomada.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    features: [],
    isPopular: true
  },
  {
    id: 'barba-simples',
    name: 'Barba Simples',
    category: 'barba',
    price: 25,
    duration: '20 min',
    description: 'Alinhamento e desenho da barba na navalha com loção pós-barba.',
    image: barbaSimplesImg,
    features: [],
    isPopular: false
  },
  {
    id: 'barba-premium',
    name: 'Barba Premium',
    category: 'barba',
    price: 30,
    duration: '25 min',
    description: 'Barba alinhada na navalha com toalha aquecida e lavagem facial.',
    image: toalhaQuenteImg,
    features: [],
    isPopular: true
  },
  {
    id: 'combo-simples',
    name: 'Combo Simples',
    category: 'combo',
    price: 50,
    duration: '45 min',
    description: 'Corte simples + barba alinhada na navalha.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    features: [],
    isPopular: true
  },
  {
    id: 'combo-premium',
    name: 'Combo Premium',
    category: 'combo',
    price: 60,
    duration: '55 min',
    description: 'Corte degradê + barba com toalha aquecida e lavagem completa.',
    image: comboPremiumImg,
    features: [],
    isPopular: true
  },
  {
    id: 'sobrancelhas',
    name: 'Sobrancelhas',
    category: 'sobrancelha',
    price: 10,
    duration: '10 min',
    description: 'Limpeza e alinhamento natural na navalha.',
    image: sobrancelhaImg,
    features: [],
    isPopular: true
  },
  {
    id: 'luzes',
    name: 'Luzes (a partir)',
    category: 'luzes',
    price: 120,
    duration: '1h 40min',
    description: 'Luzes na touca com clareamento uniforme e matização inclusa.',
    image: luzesImg,
    features: [],
    isPopular: false
  },
  {
    id: 'platinado',
    name: 'Platinado (a partir)',
    category: 'luzes',
    price: 150,
    duration: '2h',
    description: 'Descoloração global ("nevou") com proteção capilar e matização.',
    image: nevouImg,
    features: [],
    isPopular: true
  },
  {
    id: 'hidratacao',
    name: 'Hidratação',
    category: 'tratamento',
    price: 20,
    duration: '20 min',
    description: 'Reposição de brilho, maciez e nutrição para os fios.',
    image: hidratacaoImg,
    features: [],
    isPopular: false
  },
  {
    id: 'matizacao',
    name: 'Matização',
    category: 'tratamento',
    price: 30,
    duration: '20 min',
    description: 'Neutralização do tom amarelado para realçar o platinado ou grisalho.',
    image: matizacaoImg,
    features: [],
    isPopular: false
  },
  {
    id: 'hidratacao-matizacao',
    name: 'Hidratação e Matização',
    category: 'tratamento',
    price: 40,
    duration: '35 min',
    description: 'Nutrição profunda combinada com neutralização dos tons amarelados.',
    image: hidrataMatizaImg,
    features: [],
    isPopular: true
  }
];

export const COMFORT_FEATURES: ComfortFeature[] = [
  {
    id: 'toalha-quente-lavagem',
    title: 'Toalha Aquecida & Lavagem',
    description: 'Ritual clássico que abre os poros e amacia os pelos da barba para um corte sem irritações, com lavagem capilar refrescante pós-corte para você sair pronto.',
    highlight: 'Toalha Aquecida & Lavagem',
    image: toalhaQuenteImg
  },
  {
    id: 'preco-justo',
    title: 'Preço Acessível e Atendimento Individual',
    description: 'Valores acessíveis e atendimento individualizado para você manter o visual sempre alinhado no seu dia a dia, sem surpresas.',
    highlight: 'Preço Acessível',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ambiente-novo',
    title: 'Espaço Novo, Limpo & Arejado',
    description: 'Barbearia nova no Centro de Cascavel. Ambiente bem ventilado, higienizado e organizado para atender você com respeito e atenção.',
    highlight: 'Ambiente Limpo',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'corte-regua',
    title: 'Corte na Régua & Sem Espera',
    description: 'Degradê bem disfarçado, corte social alinhado e navalhas 100% descartáveis trocadas a cada cliente. Seu horário é atendido com pontualidade.',
    highlight: 'Sem Enrolação',
    image: luzesImg
  }
];

export const BARBER_TIPS = [
  {
    step: '01',
    title: 'Higiene & Lavagem',
    desc: 'A lavagem correta com água e produtos adequados remove oleosidade, poeira e resíduos de fios cortados sem ressecar o couro cabeludo.',
  },
  {
    step: '02',
    title: 'Toalha Aquecida no Barbear',
    desc: 'O vapor da toalha aquecida abre os poros e amacia a haste do pelo, prevenindo foliculite e proporcionando um barbear suave na navalha.',
  },
  {
    step: '03',
    title: 'Apare Regularmente',
    desc: 'Manter a linha da navalha a cada 10 a 15 dias garante que o desenho permaneça nítido e que o fade não perca a transição suave.',
  },
  {
    step: '04',
    title: 'Penteie Corretamente',
    desc: 'Utilize pentes de madeira anti-estática para alinhar os fios na direção natural do crescimento sem quebrar a fibra capilar.',
  },
  {
    step: '05',
    title: 'Alimentação & Água',
    desc: 'Beba no mínimo 2 litros de água por dia. Fios fortes dependem de boa circulação sanguínea e nutrição de dentro para fora.',
  },
  {
    step: '06',
    title: 'Deixe Crescer com Desenho',
    desc: 'Mesmo deixando a barba crescer, nunca deixe a linha do pescoço e bochechas sem acabamento na navalha.',
  }
];

export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: '1',
    title: 'Fade Cirúrgico & Linhas Definidas',
    category: 'cortes',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    tag: 'Degradê Navalhado'
  },
  {
    id: '2',
    title: 'Bigode & Barba na Linha da Navalha',
    category: 'barba',
    image: bigodeImg,
    tag: 'Barba & Bigode'
  },
  {
    id: '3',
    title: 'Luzes Alinhadas com Degradê',
    category: 'pigmentacao',
    image: luzesImg,
    tag: 'Luzes & Reflexo'
  },
  {
    id: '4',
    title: 'Platinado Global Nevou',
    category: 'cortes',
    image: nevouImg,
    tag: 'Nevou'
  },
  {
    id: '5',
    title: 'Aço Esterilizado & Navalhete',
    category: 'detalhes',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    tag: 'Esterilização & Lâmina'
  },
  {
    id: '6',
    title: 'Ambiente Vintage & Lounge',
    category: 'ambiente',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    tag: 'Cascavel - CE'
  }
];

export const TIME_SLOTS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00'
];
