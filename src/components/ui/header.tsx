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
    <header
      className={`sticky top-0 border-b  bg-background ${scrolled ? 'border-b-4 border-red-400 transition-all' : ''}`}
    >
      <div className="md:container">
        <div className="w-full flex h-16 items-center gap-4  px-4 md:px-10 justify-between ">{children}</div>
      </div>
    </header>
  );
};

export default Header;
