import Image from "next/image";
import styles from './banner.module.css';

export default function Banner() {
  return (
    <section className={styles.container}>
      <div className={styles.desktopBanner}>
        <Image 
          className={styles.bannerImage} 
          src="/assets/images/banner.png" 
          alt="Banner Desktop" 
          width={1200} 
          height={400} 
          priority //Carregamento prioritário
          quality={100} //Mantém a nitidez máxima da marca
        />
      </div>
      
      <div className={styles.mobileBanner}>
        <Image
          className={styles.bannerImage}
          src="/assets/images/banner-menor.png" 
          alt="Banner Mobile" 
          width={600} 
          height={800} 
          priority //Carregamento prioritário
          quality={100} //Mantém a nitidez máxima da marca
        />
      </div>
    </section>
  );
}