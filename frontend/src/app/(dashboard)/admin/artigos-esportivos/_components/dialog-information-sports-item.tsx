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
import { sportsItemType } from '@/types/sportsItem'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationSportsItemProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationSportsItem({
  id,
  children,
}: DialogInformationSportsItemProps) {
  const [sportsItem, setSportsItem] = useState<sportsItemType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setSportsItem(null)

    const requestData = async () => {
      const { response } = await api('GET', `/sport-articles/${id}`)

      if (response) {
        setSportsItem(response as sportsItemType)
      } else {
        setSportsItem(null)
        toast({
          title: 'Artigo esportivo não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setSportsItem(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do artigo esportivo</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do artigo esportivo abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsSportsItem sportsItem={sportsItem} readOnly />
      </DialogContent>
    </Dialog>
  )
}
