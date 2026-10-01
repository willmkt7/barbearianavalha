export interface ServiceItem {
  id: string;
  name: string;
  category: 'cabelo' | 'barba' | 'combo' | 'sobrancelha' | 'luzes' | 'tratamento';
  price: number;
  duration: string;
  description: string;
  image: string;
  features: string[];
  isPopular?: boolean;
}

export interface ComfortFeature {
  id: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'cortes' | 'barba' | 'pigmentacao' | 'ambiente' | 'detalhes';
  image: string;
  tag: string;
}
