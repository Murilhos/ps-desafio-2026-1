import Image from "next/image";
import styles from './banner.module.css';

export default function Banner() {
  return (
    <section className={styles.container}>
      <Image 
        className={styles.bannerImage} 
        src="/assets/images/banner.png" 
        alt="Banner" 
        width={1200} 
        height={400} 
        priority //Carregamento prioritário para performance
        quality={100} // Mantém a nitidez máxima da marca
      />
    </section>
  );
}