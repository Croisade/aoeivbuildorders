/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
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
import head from 'lodash/head'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import maxBy from 'lodash/maxBy'
import reject from 'lodash/reject'
import map from 'lodash/map'
import { returnsStyle, isSubHeader } from '../utils/Table'

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

// @tODO correct types for sethooks
export default function BuildOrderTable({
  data: buildOrderData,
  ageNumber,
  isShown,
  setBuildOrder,
  setCount,
  setBuildFormValues,
  setTouched,
}: {
  data: BuildOrder[]
  ageNumber: number
  isShown: boolean
  setBuildOrder: any
  setCount: any
  setBuildFormValues: any
  setTouched: any
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

  function editBuildOrder(buildOrder: BuildOrder[], index: number) {
    setTouched(true)
    const rejection = reject(buildOrder, x => index + 1 !== Number(x.count))
    setBuildFormValues(head(rejection))
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
            Cell: (row: Row<BuildOrder>[]) => (
              <EditIcon
                fontSize="small"
                sx={{ fontSize: '15px' }}
                onClick={() => {
                  // console.log(row)
                  // @ts-ignore
                  editBuildOrder(row.data, row.row!.index)
                }}
              />
            ),
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
