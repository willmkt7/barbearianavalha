import React from 'react';
import logoNavalhaImg from '../assets/images/logo-navalha.png';

interface NavalhaLogoProps {
  className?: string;
  size?: number | string;
  withCircle?: boolean;
}

export const NavalhaLogo: React.FC<NavalhaLogoProps> = ({
  className = 'w-10 h-10',
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <img
      src={logoNavalhaImg}
      alt="Logo Barbearia Navalha"
      width={512}
      height={512}
      style={style}
      className={`select-none flex-shrink-0 rounded-full overflow-hidden object-cover ${className}`}
    />
  );
};




