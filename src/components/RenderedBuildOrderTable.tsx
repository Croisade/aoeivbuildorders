/* eslint-disable react/jsx-props-no-spreading */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTable } from 'react-table'
import { isSubHeader, returnsStyle } from '../utils/Table'
import { BuildOrder } from './BuildOrderTable'

interface ColumnDetails {
  [key: string]: any
}

const RenderOrderTable = function RenderOrderTable({
  ageNumber,
  buildOrderData,
}: {
  ageNumber: number
  buildOrderData: BuildOrder[]
}) {
  const data = React.useMemo<BuildOrder[]>(() => buildOrderData, [buildOrderData])
  const columns = React.useMemo<ColumnDetails[]>(
    () => [
      {
        id: 'col1',
        // eslint-disable-next-line react/no-unstable-nested-components
        Header: () => <div style={{ textAlign: 'center', fontSize: '20px' }}>{`Age ${ageNumber}`}</div>,
        columns: [
          {
            Header: '',
            accessor: 'count', // accessor is the "key" in the data
          },

          {
            Header: '',
            accessor: 'time',
          },
          {
            Header: '',
            accessor: 'population',
          },
          {
            Header: '',
            accessor: 'wood',
          },
          {
            Header: '',
            accessor: 'food',
          },
          {
            Header: '',
            accessor: 'gold',
          },
          {
            Header: '',
            accessor: 'stone',
          },
          {
            Header: '',
            accessor: 'builders',
          },
          {
            Header: '',
            accessor: 'action',
          },
          {
            Header: '',
            accessor: 'edit',
          },
          {
            Header: '',
            accessor: 'delete',
          },
        ],
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    // @ts-ignore
  } = useTable({ columns, data })
  return (
    <div style={{ maxWidth: '100%', overflow: 'auto' }}>
      <Table {...getTableProps()} style={{}} size="small">
        <TableHead>
          {/* @ts-ignore */}
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()} hover>
              {/* @ts-ignore */}
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()} style={isSubHeader(column.depth)}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {/* @ts-ignore */}
          {rows.map(row => {
            prepareRow(row)

            return (
              <TableRow {...row.getRowProps()}>
                {/* @ts-ignore */}
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()} sx={returnsStyle(cell.column.id)} size="small">
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default RenderOrderTable
