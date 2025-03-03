import { create } from 'zustand'

const baseObject = [
  {
    dia: 'Lunes',
    horas: Array(11).fill('(vacío)')
  },
  {
    dia: 'Martes',
    horas: Array(11).fill('(vacío)')
  },
  {
    dia: 'Miércoles',
    horas: Array(11).fill('(vacío)')
  },
  {
    dia: 'Jueves',
    horas: Array(11).fill('(vacío)')
  },
  {
    dia: 'Viernes',
    horas: Array(11).fill('(vacío)')
  },
]

export const useMateriasStore = create((set) => ({
  materiasObject: baseObject,
  updateMateriasObject: (newObj) => set({ materiasObject: newObj })
}))
