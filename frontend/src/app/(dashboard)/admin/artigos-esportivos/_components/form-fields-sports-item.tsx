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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { CategoryType } from '@/types/category'
import { sportsItemType } from '@/types/sportsItem'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
}: FormFieldsSportsItemProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    sportsItem?.category ?? null
  )
  useEffect(() => {
    if (sportsItem?.category) {
      setSelectedCategory(sportsItem.category)
    }
  }, [sportsItem])
  
  useEffect(() => {
    async function getCategories() {
      const { response, error } = await api('GET', '/category')

      if (response) {
        setCategories(response as CategoryType[])
      } else {
        console.error(error?.message)
      }
    }

    getCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}
        {/* inserir campos do formulário */}
        <FormField>
          <Label htmlFor="image" required={!sportsItem}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || sportsItem?.image}
          />
        </FormField>
        <FormField>
          <Label htmlFor="name" required={!sportsItem}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do artigo esportivo"
            defaultValue={sportsItem?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="brand" required={!sportsItem}>
            Marca
          </Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira a marca do artigo esportivo"
            defaultValue={sportsItem?.brand}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!sportsItem}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do artigo esportivo"
            defaultValue={sportsItem?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required={!sportsItem}>
            Ano
          </Label>
          <Input
            name="year"
            id="year"
            maxLength={4}
            placeholder="Insira o ano do artigo esportivo"
            defaultValue={sportsItem?.year}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.year}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
          />
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!sportsItem}>
            Categoria
          </Label>
          <Input
            name="category_id"
            id="category_id"
            type="hidden"
            value={selectedCategory?.id}
          />
          <Select
            value={selectedCategory?.id}
            onValueChange={(value) => setSelectedCategory(categories.find((category) => category.id === value) || null)}
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!sportsItem}>
            Quantidade
          </Label>
          <Input
            name="amount"
            id="amount"
            placeholder="Insira a quantidade do artigo esportivo"
            defaultValue={sportsItem?.amount}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.amount}
            type="number"
            min="0"
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
