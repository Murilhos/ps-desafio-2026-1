import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css"


export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <Link href="/">
                <Image src="/assets/images/logo.png" alt="Logo" width={120} height={40} priority/>
            </Link>
            <div className={styles.headerLinks}>
                {/* <Link href="" onClick ={() => scrollToElement('products')} className={styles.headerLink}>Produtos</Link>*/}
                  <Link href="" className={styles.headerLink}>Produtos</Link>
                  <Link href="" className={styles.headerLink}>Categorias</Link>
                  <Link href="" className={styles.headerLink}>Sobre nós</Link>
                  <Link href="" className={styles.headerLink}>Contato</Link>
            </div>
        </div>
    </header>
  )
}
