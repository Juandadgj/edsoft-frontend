import { ContainerComponents } from '@/components/ContainerComponents'
import TableComponent from '@/components/Table'
import React from 'react'

export const BestStudents = () => {
  const columns = [
    {
      title: 'Curso',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Cambiar",
      dataIndex: "change",
      key: "change",
    },
    {
      title: "Quitar",
      dataIndex: "delete",
      key: "delete",
    }
  ]
  return (
    <ContainerComponents>
      <TableComponent column={columns} data={[]} />
    </ContainerComponents>
  )
}
