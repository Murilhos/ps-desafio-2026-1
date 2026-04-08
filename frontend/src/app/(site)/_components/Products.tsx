'use client'

import { sportsItemType } from '@/types/sportsItem';
import styles from './products.module.css';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

export default function Products() {
    const [sportsItems, setSportsItems] = useState<sportsItemType[]>([]);

    useEffect(() => {
        async function getSportsItems() {
            const {response, error} = await api('GET', '/sport-articles');

            if (response) {
                setSportsItems(response as sportsItemType[]);
            } else {
                console.error(error?.message);
            }
        }

        getSportsItems();
    }, []);

    return (
        <section className={styles.products} id="products">
            <div className={styles.container}>
                <h1 className={styles.title}>Nossos Produtos</h1>
                <div className={styles.productsList}>
                   {sportsItems.map((sportsItem) => (
                        <ProductCard key={sportsItem.id} {...sportsItem}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
