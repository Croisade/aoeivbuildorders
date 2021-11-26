import { BuildOrder } from './components/BuildOrderTable'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CIVILIZATIONS: string[] = [
  'Abbasid Dynasty',
  'China',
  'Delhi Sultanate',
  'French',
  'English',
  'Holy Roman Empire',
  'Mongols',
  'Rus',
]

export const initialValues: BuildOrder = {
  count: 1,
  time: '',
  population: '',
  action: '',
  wood: '',
  food: '',
  gold: '',
  stone: '',
  builders: '',
}

export default {}
