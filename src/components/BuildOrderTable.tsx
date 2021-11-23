/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { useTable } from 'react-table'

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

export default function BuildOrderTable(props: Props) {
  const {data:buildOrderData } = props
  const data = React.useMemo<BuildOrder[]>(
    () => buildOrderData,  [buildOrderData],
  )

  const columns= React.useMemo<ColumnDetails[]>(
  () => [
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
    [],
  )

  function returnsStyle(key: string) {
    switch (key) {
      case 'count':
        return { background: 'rgba(97,97,97)', width: 50, height: 38 }
      case 'time':
        return { background: 'rgba(117, 117, 117, 0.3)', minWidth: 50, minHeight: 38 }
      case 'population':
        return { background: 'rgba(158, 158, 158, 0.3)', width: 50, height: 38 }
      case 'wood':
        return { background: 'rgba(199, 79, 12, 0.3)', width: 50, height: 38 }
      case 'food':
        return { background: 'rgba(204, 95, 59)', opacity: 1.0, width: 50, height: 38 }
      case 'gold':
        return { background: '#CF8A0A', opacity: 1.0, width: 50, height: 38 }
      case 'stone':
        return { background: '#878686', opacity: 0.47, width: 50, height: 38 }
      case 'builders':
        return { background: '#FFB763', opacity: 0.47, width: 50, height: 38 }
      case 'action':
        return { background: '#424242', opacity: 0.08, width: 538, height: 38 }
      case 'edit':
        return { background: '#424242', opacity: 0.08, width: 50, height: 38 }
      case 'delete':
        return { background: '#424242', opacity: 0.08, width: 50, height: 38 }
      default:
        break
    }
    return {
      padding: '10px',
      border: 'solid 1px gray',
      background: '#424242',
    }
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
    <table {...getTableProps()} style={{}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  display: 'none',
                  minWidth: column.minWidth,
                  maxHeight: 38,
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={returnsStyle(cell.column.id)}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
