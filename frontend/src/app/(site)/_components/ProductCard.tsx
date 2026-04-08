'use client'

import Link from "next/link";
import Image from "next/image";
import styles from "./productCard.module.css";
import { sportsItemType } from "@/types/sportsItem";
import { buySportsItem } from "@/actions/sportsItem";

export default function ProductCard(sportsItem: sportsItemType) {

    const handleBuy = async () => {
        const responseString = await buySportsItem(sportsItem.id);//
        const response = JSON.parse(responseString);

        console.log(response);

        if(!response.error){
            alert('Compra realizada com sucesso!');
        } else{
            alert('Ocorreu um erro ao realizar a compra.');    
        }
    };

    return (
        <div className={styles.productCard}>
            <Link href={`/products/${sportsItem.id}`} className={styles.productLink}>
                <Image className={styles.productImage} src={sportsItem.image} alt={sportsItem.name} width={300} height={200} />
            </Link>
            <h1 className={styles.productName}>{sportsItem.name}</h1>
            <p className={styles.productCategory}>Categoria: {sportsItem.category.name}</p>
            <p className={styles.productBrand}>Marca: {sportsItem.brand}</p>
            <p className={styles.productYear}>Lançamento: {sportsItem.year}</p>
            <p className={styles.productPrice}>R$ {sportsItem.price.toFixed(2)}</p>
            <p className={styles.productAmount}>Quantidade: {sportsItem.amount} em estoque</p>
            {sportsItem.amount > 0 ? (
                <button className={styles.buyButton} onClick={handleBuy}>
                    Comprar
                </button>
            ) : (
                <button className={styles.buyButton} disabled>
                    Indisponível
                </button>
            )}
        </div>
    );   
}