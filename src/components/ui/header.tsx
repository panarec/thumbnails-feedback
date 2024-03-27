'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  //show border on header only when scrolled
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={`sticky top-0 z-40  bg-white py-2  w-full ${scrolled ? 'border-b-4 border-red-400 transition-all' : ''}`}>{children}</header>
  );
};

export default Header;