'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsSportsItem from './form-fields-sports-item'
import { updateSportsItem } from '@/actions/sportsItem'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { sportsItemType } from '@/types/sportsItem'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateSportsItemProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateSportsItem({ id, children }: DialogUpdateSportsItemProps) {
  const [sportsItem, setSportsItem] = useState<sportsItemType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setSportsItem(null)
    
    const requestData = async () => {
      const { response } = await api<sportsItemType>('GET', `/sport-articles/${id}`)

      if (response) {
        setSportsItem(response)
      } else {
        setSportsItem(null)
        toast({
          title: 'Artigo esportivo  não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setSportsItem(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateSportsItem(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o artigo esportivo!',
      })
    } else {
      toast({
        title: 'Artigo esportivo editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar artigo esportivo</DialogTitle>
          <DialogDescription>
            Atualize as informações do artigo esportivo abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsSportsItem error={error} sportsItem={sportsItem} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
