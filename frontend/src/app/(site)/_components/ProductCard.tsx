'use client'

import Image from "next/image";
import styles from "./productCard.module.css";
import { sportsItemType } from "@/types/sportsItem";

interface ProductCardProps {
    sportsItem: sportsItemType;
    onOpenModal: (item: sportsItemType) => void;
}


export default function ProductCard({ sportsItem, onOpenModal }: ProductCardProps) {


    return (
        <div className={styles.productCard}>
            <div className={styles.productLink} onClick={() => onOpenModal(sportsItem)} style={{ cursor: 'pointer' }}>
                <Image className={styles.productImage}
                    src={sportsItem.image}
                    alt={sportsItem.name}
                    width={300}
                    height={200}
                />      
            </div>
            <h1 className={styles.productName}>{sportsItem.name}</h1>
            <p className={styles.productCategory}>Categoria: {sportsItem.category.name}</p>
            <p className={styles.productBrand}>Marca: {sportsItem.brand}</p>
            <p className={styles.productPrice}>R$ {sportsItem.price.toFixed(2)}</p>
            <p className={styles.productStock}>Quantidade: {sportsItem.amount} em estoque</p>

            <button className={styles.buyButton} onClick={() => onOpenModal(sportsItem)} disabled={sportsItem.amount <= 0}>
                {sportsItem.amount > 0 ? 'Ver Detalhes' : 'Indisponível'}
            </button>
        </div>

    );   
}

