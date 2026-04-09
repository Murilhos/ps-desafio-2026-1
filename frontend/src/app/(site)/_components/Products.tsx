'use client'

import { sportsItemType } from '@/types/sportsItem';
import styles from './products.module.css';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

//Imports Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Products() {
    const [sportsItems, setSportsItems] = useState<sportsItemType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<sportsItemType | null>(null);

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

    
    /**
     * Atualiza a quantidade (stock) de um item de esporte específico na lista de itens.
     * 
     * Parâmetro: id - O identificador único do item cujo estoque será atualizado
     *            newAmount - A nova quantidade/estoque do item
     * 
     * Explicação:
     * Esta função utiliza o padrão imutável do React, criando um novo array em vez de modificar
     * diretamente o estado. Ela procura o item pelo ID e atualiza apenas sua propriedade `amount`,
     * mantendo as demais propriedades intactas através do spread operator.
     */
    const updateStock = (id:string,newAmount: number) => {
        setSportsItems(prev => 
            prev.map(item => item.id === id ? { ...item, amount: newAmount } : item)
        );
    };

    return (
        <section className={styles.products} id="products">
            <div className={styles.container}>
                <h1 className={styles.title}>Nossos Produtos</h1>

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 5 },
                    }}
                    className={styles.mySwiper}
                >
                    {sportsItems.map(item => (
                        <SwiperSlide key={item.id}>
                            <ProductCard sportsItem={item} onOpenModal={(clickedItem) => setSelectedProduct(clickedItem)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {selectedProduct && (
                <ProductModal 
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onUpdateStock={updateStock}
                />
            )}
        </section>
    );
}
