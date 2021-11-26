export const tenPx = { width: '10px' }

export function isSubHeader(number: number) {
  if (number > 0) {
    return { display: 'none' }
  }
  return {}
}

// @TODO put this in the cell field, less computation the better
export function returnsStyle(key: string) {
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
      return { background: 'rgba(66,66,66,0.08)', ...tenPx }
    case 'delete':
      return { background: 'rgba(66,66,66,0.08)', ...tenPx }
    default:
      break
  }
  return {
    padding: '10px',
    border: 'solid 1px gray',
    background: '#424242',
  }
}

export default {}
