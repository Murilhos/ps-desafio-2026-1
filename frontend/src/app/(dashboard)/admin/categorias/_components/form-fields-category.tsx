'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { CategoryType } from '@/types/category'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsCategoryProps {
  category?: CategoryType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCategory({
  category,
  readOnly,
  error,
}: FormFieldsCategoryProps) {
  const { pending } = useFormStatus()
  return (
    <>
      <FormFieldsGroup>
        {category && (
          <Input defaultValue={category.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="name" required={!category}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome da categoria"
            defaultValue={category?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
