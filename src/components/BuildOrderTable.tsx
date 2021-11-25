/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import * as React from 'react'
import { Row, useTable } from 'react-table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Table from '@mui/material/Table'
import chunk from 'lodash/chunk'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import maxBy from 'lodash/maxBy'
import map from 'lodash/map'

// * Look over materialUI tables API's and clean up our grid
interface ColumnDetails {
  [key: string]: any
}

// TODO make this more strict
export interface BuildOrder {
  count: number
  action: string
  time: string
  population: string
  wood: string
  food: string
  gold: string
  stone: string
  builders: string
}

export interface Props {
  data: BuildOrder[]
}

const tenPx = { width: '10px' }

// @tODO correct types for sethooks
export default function BuildOrderTable({
  data: buildOrderData,
  ageNumber,
  isShown,
  setBuildOrder,
  setCount,
}: {
  data: BuildOrder[]
  ageNumber: number
  isShown: boolean
  setBuildOrder: any
  setCount: any
}) {
  // @TODO clean this up
  function splitAtIndex(list: BuildOrder[], index: number) {
    return [list.slice(0, index), list.slice(index)]
  }

  function subtractBuildOrderCount(buildOrder: BuildOrder[], countFromRow: string): void {
    if (countFromRow === '0' && buildOrder.length === 1) {
      setBuildOrder([])
      setCount(1)
    } else {
      const filtered = filter(buildOrder, x => Number(x.count) !== Number(countFromRow) + 1)

      if (countFromRow === '0') {
        const reducedCount = map(filtered, x => {
          const { count } = x
          return { ...x, ...{ count: count - 1 } }
        })

        const idk = maxBy(reducedCount, x => x.count)
        const max = Number(idk?.count) + 1
        if (max < 1) {
          setCount(1)
        }
        setCount(max)
        setBuildOrder(reducedCount)
      } else {
        const chunkedBuildOrder = splitAtIndex(filtered, Number(countFromRow))
        const concated = concat(
          chunkedBuildOrder[0],
          map(chunkedBuildOrder[1], x => {
            const { count } = x
            return { ...x, ...{ count: count - 1 } }
          }),
        )
        const idk = maxBy(concated, x => x.count)
        const max = Number(idk?.count) + 1
        if (max < 1) {
          setCount(1)
        }
        setCount(max)
        setBuildOrder(concated)
      }
    }
  }

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
            Cell: () => <EditIcon fontSize="small" sx={{ fontSize: '15px' }} />,
          },
          {
            Header: '',
            accessor: 'delete',
            Cell: (row: Row<BuildOrder>[]) => (
              <DeleteIcon
                fontSize="small"
                sx={{ fontSize: '15px' }}
                onClick={() => {
                  // @ts-ignore
                  subtractBuildOrderCount(row.data, row.row!.id)
                }}
              />
            ),
          },
        ],
      },
    ],
    [],
  )

  // @TODO put this in the cell field, less computation the better
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
    }
    return {}
  }

  function isTableShown(bool: boolean) {
    const general = { maxWidth: '100%', overflow: 'auto' }
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
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <TableRow {...row.getRowProps()}>
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
