/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import * as React from 'react'
import { useTable } from 'react-table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'

// * Look over materialUI tables API's and clean up our grid
interface ColumnDetails {
  [key: string]: any
}

// TODO make this more strict
export interface BuildOrder {
  count: number | null
  action: string
  time: string | null
  population: string | null
  wood: string | null
  food: string | null
  gold: string | null
  stone: string | null
  builders: string | null
}

export interface Props {
  data: BuildOrder[]
}

const tenPx = { width: '10px' }

export default function BuildOrderTable({
  data: buildOrderData,
  ageNumber,
  isShown,
}: {
  data: BuildOrder[]
  ageNumber: number
  isShown: boolean
}) {
  const data = React.useMemo<BuildOrder[]>(() => buildOrderData, [buildOrderData])

  const columns = React.useMemo<ColumnDetails[]>(
    () => [
      {
        // Header: `Age ${ageNumber}`,
        id: 'col1',
        // eslint-disable-next-line react/no-unstable-nested-components
        Header: () => <div style={{ textAlign: 'center', fontSize: '20px' }}>{`Age ${ageNumber}`}</div>,
        columns: [
          {
            Header: 'hi',
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

  function returnsStyle(key: string) {
    switch (key) {
      case 'count':
        return { background: 'rgba(97,97,97)', width: '10px' }
      case 'time':
        return { background: 'rgba(117, 117, 117, 0.3)', width: '15px' }
      case 'population':
        return { background: 'rgba(158, 158, 158, 0.3)', width: '10px' }
      case 'wood':
        return { background: 'rgba(199, 79, 12, 0.3)', ...tenPx }
      case 'food':
        return { background: 'rgba(204, 95, 59)', ...tenPx }
      case 'gold':
        return { background: '#CF8A0A', ...tenPx }
      case 'stone':
        return { background: 'rgba(135, 134, 134, 0.47)', ...tenPx }
      case 'builders':
        return { background: 'rgba(255, 183, 99, 0.47)', ...tenPx }
      case 'action':
        return { background: 'rgba(66,66,66,0.08)', width: '80%', minWidth: '400px' }
      case 'edit':
        return { background: 'rgba(92,66,66,0.08)', ...tenPx }
      case 'delete':
        return { background: 'rgba(66,92,66,0.08)', ...tenPx }
      default:
        break
    }
    return {
      padding: '10px',
      border: 'solid 1px gray',
      background: '#424242',
    }
  }

  function isSubHeader(number: number) {
    if (number > 0) {
      return { display: 'none' }
      // return { justifyContent: 'center', alignItems: 'center' }
    }
    return {}
  }

  function isTableShown(bool: boolean) {
    const general = { maxWidth: '100%', overflow: 'auto' }
    // const general = { overflow: 'auto' }
    return bool ? general : { display: 'none', ...general }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    // @ts-ignore
  } = useTable({ columns, data })
  return (
    <div style={isTableShown(isShown)}>
      <Table {...getTableProps()} style={{}} size="small">
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()} hover>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()} style={isSubHeader(column.depth)}>
                  {console.log('column', column)}
                  {console.log(ageNumber)}
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        {/* <div style={{ maxWidth: '100%' }}> */}
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()} sx={returnsStyle(cell.column.id)} size="small">
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </tr>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
