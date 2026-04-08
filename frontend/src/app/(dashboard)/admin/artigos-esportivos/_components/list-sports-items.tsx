'use client'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateSportsItem } from './dialog-update-sports-item'
import { DialogSportsItemDelete } from './dialog-delete-sports-item'
import { DialogInformationSportsItem } from './dialog-information-sports-item'
import { DialogCreateSportsItem } from './dialog-create-sports-item'
import { useEffect, useState } from 'react'

export default async function ListSportsItems() {
  const [sportsItems, setSportsItems] = useState<sportsItemType[] | null>(null)

  useEffect(() => {
    async function getSportsItems() {
      const { response, error } = await api('GET', '/sport-articles')

      if (response) {
        setSportsItems(response as sportsItemType[])
      } else{
        console.error(error?.message)
      }
    }

    getSportsItems()
  }, [])


  if (!sportsItems) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os imóveis.
      </DashboardContainer>
    )
  }


  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateSportsItem>
          <Button size="sm">
            <LuPlusCircle />
            Novo artigo esportivo
          </Button>
        </DialogCreateSportsItem>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sportsItems?.map((sportsItem: sportsItemType) => (
              <TableRow key={sportsItem.id}>
                <TableCell>
                  <TabbleCellImage src={sportsItem.image} />
                </TableCell>
                
                <TableCell>{sportsItem.name}</TableCell>
                <TableCell>{sportsItem.brand}</TableCell>
                <TableCell>{sportsItem.price}</TableCell>
                <TableCell>{sportsItem.year}</TableCell>
                <TableCell>{sportsItem.amount}</TableCell>
                <TableCell>{sportsItem.category.name}</TableCell>
                {/* Propriedades de sportsItemType */}
                
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationSportsItem id={sportsItem.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationSportsItem>
                  <DialogUpdateSportsItem id={sportsItem.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateSportsItem>
                  <DialogSportsItemDelete id={sportsItem.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogSportsItemDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!sportsItems.length && (
            <TableCaption>Nenhum artigo esportivo encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
