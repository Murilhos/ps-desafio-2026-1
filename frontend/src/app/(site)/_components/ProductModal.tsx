'use client'

import { sportsItemType } from "@/types/sportsItem"
import styles from "./productModal.module.css"
import { buySportsItem } from "@/actions/sportsItem"
import Image from "next/image"
import { useState } from "react"
import { getAddressByCep } from "@/services/cep"

interface ModalProps {
    product: sportsItemType
    onClose: () => void
    onUpdateStock: (id:string, newAmount: number) => void
}

export default function ProductModal({ product, onClose, onUpdateStock }: ModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [isBuying, setIsBuying] = useState(false);
    const [cep, setCep] = useState('');
    const [shippingInfo, setShippingInfo] = useState('');
    const [isCepValid, setIsCepValid] = useState(false);

    const handleFinalBuy = async () => {
        setIsBuying(true);
        try{
            const res = await buySportsItem(product.id, quantity);
            const { response, error } = JSON.parse(res);
            

            //Pegar o valor recebido da API e mandar para o pai
            if(response){
                onUpdateStock(product.id, response.amount); // Atualiza o estoque do produto com o valor retornado pela API
                alert('Compra realizada com sucesso!');
                onClose(); // Fecha o modal após a compra
            } else{
                alert('Erro: ' + (error?.message || 'Falha ao processar compra.'));
            }
        } catch (err){
            alert('Ocorreu um erro ao realizar a compra.');
        }
        finally {
            setIsBuying(false);
        }
    };

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCep(value);

        if (value.length === 8) {
            const data = await getAddressByCep(value);
            if (data) {
                setShippingInfo(`Entrega para: ${data.localidade} - R$ 15,90 (3 dias úteis)`);
                setIsCepValid(true);
            } else {
                setShippingInfo('CEP não encontrado.');
                setIsCepValid(false);
            }
        } else{
            setIsCepValid(false);
            setShippingInfo('');
        }
    };

    return(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                
                <div className={styles.grid}>
                    {/* Coluna da Imagem */}
                    <div className={styles.imageBox}>
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            width={400} 
                            height={400} 
                            className={styles.mainImg}
                        />
                    </div>

                    {/* Coluna de Informações */}
                    <div className={styles.infoBox}>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.brand}>Marca: <span>{product.brand}</span></p>
                        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
                        
                        <div className={styles.controls}>
                            <div className={styles.inputGroup}>
                                <label>Quantidade (Disponível: {product.amount})</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max={product.amount} 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Simular Frete</label>
                                <input 
                                    type="text"
                                    placeholder="00000-000"
                                    maxLength={8}
                                    value={cep}
                                    onChange={handleCepChange} //Ativa a busca criada
                                />
                                {/* Exibe o resultado da API ViaCEP abaixo do input */}
                                {shippingInfo && <p className={styles.shippingResult}>{shippingInfo}</p>}
                            </div>
                        </div>

                        <button 
                            className={styles.buyBtn} 
                            onClick={handleFinalBuy}
                            disabled={isBuying || product.amount <= 0 || !isCepValid} // Desabilita se estiver processando, sem estoque ou CEP inválido
                        >
                            {isBuying ? 'PROCESSANDO...' : 
                            product.amount <= 0 ? 'ESGOTADO' : 
                            !isCepValid ? 'INFORME UM CEP VÁLIDO' : 'FINALIZAR COMPRA'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
