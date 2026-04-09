'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/sport-articles', { data: form })

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function updateSportsItem(form: FormData) {
    const id = form.get('id') as string
    const res = await api('POST', `/sport-articles/${id}`, { data: form })

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/sport-articles/${id}`)

    if(!res.error){
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function buySportsItem(id: string, quantity: number = 1) {
    const res = await api('POST', `/sport-articles/${id}`, { data: { quantity } })

    if(!res.error){
        revalidatePath('/')
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}
