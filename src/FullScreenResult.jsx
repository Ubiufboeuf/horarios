import { getFinalObject } from './Preview';
import { useMateriasStore } from './useMateriasStore'
import { useRef } from 'react'

const horas = [
  { inicio: '12:45', fin: '13:45', type: '' },
  { inicio: '13:25', fin: '14:05', type: '' },
  { inicio: '14:05', fin: '14:10', type: 'recreo' },
  { inicio: '14:10', fin: '14:55', type: '' },
  { inicio: '14:55', fin: '15:00', type: 'recreo' },
  { inicio: '15:00', fin: '15:40', type: '' },
  { inicio: '15:40', fin: '16:20', type: '' },
  { inicio: '16:20', fin: '16:25', type: 'recreo' },
  { inicio: '16:25', fin: '17:05', type: '' },
  { inicio: '17:05', fin: '17:45', type: '' },
  { inicio: '17:45', fin: '18:30', type: '' }
]

const dias = {
  'Lunes': 0,
  'Martes': 1,
  'Miércoles': 2,
  'Jueves': 3,
  'Viernes': 4,
}

const colors = {
  Sociología: 'brown',
  Cálculo: 'blueviolet',
  'Emprendurismo y Gestión': 'coral',
  Filosofía: 'crimson',
  'Física Mecánica Clásica': 'rgb(13, 114, 13)',
  'Ingeniería de Software': 'rgb(190, 7, 7)',
  Inglés: 'rgb(221, 146, 7)',
  'Tutoría Proyecto UTULAB': 'purple',
  'Matemática CTS': 'rgb(35, 91, 99)',
  'Programación Full Stack': 'rgb(219, 90, 155)',
  'Admin. Sis. Op.': 'royalblue',
  'Inteligencia Artificial': 'indianred',
};

export function FullScreenResult () {
  const materiasObject = useMateriasStore((state) => state.materiasObject)
  const materias = getFinalObject(materiasObject)
  const dialogRef = useRef()

  function hideDialog (event) {
    if (event.target !== dialogRef.current) return
    dialogRef.current.setAttribute('hidden', '')
  }
  
  return (
    <dialog
      id='fullScreenPreview'
      className='absolute backdrop-blur-lg bg-[#1111] h-full w-full flex items-center justify-center'
      onClick={hideDialog}
      ref={dialogRef}
      hidden
    >
      <section className='h-fit w-full max-h-[600px] max-w-screen-xl flex items-center justify-center overflow-auto bg-transparent'>
        <main id='horarios' className='w-full h-fit gap-1 bg-neutral-900 rounded-xl grid grid-cols-6 px-4 py-3 text-center [&>*:not(.recreo)]:h-10 [&>*:not(.recreo)]:w-full [&>*:not(.recreo)]:overflow-hidden [&>*:not(.recreo):not(.void)]:border [&>*:not(.recreo):not(.void)]:border-neutral-600 [&>*:not(.recreo)]:rounded-lg [&>*:not(.recreo)]:flex [&>*:not(.recreo)]:items-center [&>*:not(.recreo)]:justify-center'>
          <div className='h-10 [grid-row:1]'>Horas</div>
          <div className='h-10 [grid-row:1]'>Lunes</div>
          <div className='h-10 [grid-row:1]'>Martes</div>
          <div className='h-10 [grid-row:1]'>Miércoles</div>
          <div className='h-10 [grid-row:1]'>Jueves</div>
          <div className='h-10 [grid-row:1]'>Viernes</div>
          {
            horas.map((hora, idx) => {
              if (hora.type === 'recreo') {
                return (
                  <div key={`recreo-${idx}`} className='recreo text-xs [grid-column:1/-1] flex items-center justify-around h-4 text-neutral-500 bg-[#34343434] rounded-lg'>
                    <strong className='w-full'>{hora.inicio} - {hora.fin}</strong>
                    <span className='w-full'>Recreo</span>
                    <span className='w-full'>Recreo</span>
                    <span className='w-full'>Recreo</span>
                    <span className='w-full'>Recreo</span>
                    <span className='w-full'>Recreo</span>
                  </div>
                )
              }
              return (
                <div key={`hora-${hora.inicio}-${hora.fin}-${idx}`} className='h-8 [grid-column:1]'>
                  {hora.inicio} - {hora.fin}
                </div>
              )
            })
          }
          {
            materias.map(dia => {
              return dia.horas.map((hora, hora_idx) => {
                if (hora_idx === 2 || hora_idx === 4 || hora_idx === 7) {
                  return
                }
                return (
                  <span
                    key={`materias-el-${dia}-${hora.hora}-${hora_idx}`}
                    style={{
                      gridColumn: dias[dia.dia]+2,
                      gridRow: `${hora_idx+2}${hora.span ? ` / span ${hora.span}` : ''}`,
                      '--color': colors[hora.hora],
                      height: '100%'
                    }}
                    className={`${hora.hora === '' ? 'void' : ''} h-full w-full text-base rounded-lg font-semibold hover:bg-[var(--color)]`}
                  >
                    {hora.hora}
                  </span>
                )
              })
            })
          }
        </main>
      </section>
    </dialog>
  )
}
