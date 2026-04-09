'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css"
import { useState, useEffect } from "react";



export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Lógica do Header (Sobe/Desce)
  useEffect(() => {
      const controlHeader = () => {
          if (typeof window !== 'undefined') {
              // Se rolar para baixo, esconde. Se rolar para cima, mostra.
              if (window.scrollY > lastScrollY && window.scrollY > 100) {
                  setIsVisible(false);
              } else {
                  setIsVisible(true);
              }
              setLastScrollY(window.scrollY);
          }
      };
      window.addEventListener('scroll', controlHeader);

      return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  //Verifica o tema salvo no navegador assim que o componente carrega
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    //"Dark" é definido como padrão se nada estiver salvo
    if (savedTheme === 'dark' || !savedTheme) {
      setIsDark(true);
      document.querySelector('.theme')?.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.querySelector('.theme')?.setAttribute('data-theme', 'light');
    }
    
  }, []);

  //Função para alternar entre Dark e Light
  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    
    // Aplica o atributo na div que envolve o site
    document.querySelector('.theme')?.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/">
          <Image className={styles.logo}
            src="/assets/images/logo.png" 
            alt="logo" 
            width={120} 
            height={40} 
            priority
          />
        </Link>

        {/* Navegação */}
        <nav className={styles.headerLinks}>
          <Link href="#products" className={styles.headerLink}>Produtos</Link>
          <Link href="#categorias" className={styles.headerLink}>Categorias</Link>
          
          {/* Link do Admin */}
          <Link href="/admin" className={styles.headerLink} style={{ color: 'hsl(var(--accent))' }}>
            Admin
          </Link>

          {/* Botão de Toggle */}
          <button onClick={toggleTheme} className={styles.themeBtn} title="Trocar Tema">
            <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
            <span className={styles.btnText}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}