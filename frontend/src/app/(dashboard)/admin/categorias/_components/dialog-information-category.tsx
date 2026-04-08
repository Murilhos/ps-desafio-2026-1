'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { CategoryType } from '@/types/category'
//import SkeletonFormFieldsCategory from './skeleton-category'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCategoryProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCategory({
  id,
  children,
}: DialogInformationCategoryProps) {
  const [category, setCategory] = useState<CategoryType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setCategory(null)

    const requestData = async () => {
      const { response } = await api('GET', `/category/${id}`)

      if (response) {
        setCategory(response as CategoryType)
      } else {
        setCategory(null)
        toast({
          title: 'Categoria não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setCategory(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        {category ? (
          <FormFieldsCategory category={category} readOnly />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

/* : (
          <SkeletonFormFieldsCategory readOnly />
        )}*/