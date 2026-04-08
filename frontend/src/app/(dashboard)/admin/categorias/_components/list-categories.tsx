'use client'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'

import { CategoryType } from '@/types/category'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCategory } from './dialog-update-category'
import { DialogCategoryDelete } from './dialog-delete-category'
import { DialogInformationCategory } from './dialog-information-category'
import { DialogCreateCategory } from './dialog-create-category'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'


export default async function ListCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  
  useEffect(() => {
    async function getCategories() {
        const { response, error } = await api ('GET', '/category')
      
        if (response) {
          setCategories(response as CategoryType[])
        } else {
          console.error(error?.message)
        }
    }

    getCategories()
  }, [])


  if (!categories) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as categorias.
      </DashboardContainer>
    )
  }


  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCategory>
          <Button size="sm">
            <LuPlusCircle />
            Nova categoria
          </Button>
        </DialogCreateCategory>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: CategoryType) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCategory id={category.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCategory>
                  <DialogUpdateCategory id={category.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCategory>
                  <DialogCategoryDelete id={category.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCategoryDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!categories.length && (
            <TableCaption>Nenhuma categoria encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
