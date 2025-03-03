import { useMateriasStore } from './useMateriasStore'

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
}

export function getFinalObject (ob) {
  const finalObject = []
  let prev = ''
  for (const d in ob) {
    const dia = ob[d]
    const horas = []
    for (const h in dia.horas) {
      const hora = dia.horas[h]
      if (hora === '') {
        // continue
        horas[h] = { hora: 'recreo' }
      } else if (hora === '(vacío)') {
        console.log(dia.dia, h, 'vacío')
        horas[h] = { hora: '' }
      } else {
        if (prev === hora) {
          horas[h-1] = { hora, span: 2 }
        } else {
          horas[h] = { hora }
        }
      }
      prev = hora
    }
    finalObject[d] = { dia: dia.dia, horas }
  }
  return finalObject
}

export function Preview () {
  const materiasObject = useMateriasStore((state) => state.materiasObject)
  const materias = getFinalObject(materiasObject)

  function fullScreenPreview () {
    const fsp = document.querySelector('#fullScreenPreview')
    fsp.removeAttribute('hidden')
  }
  
  return (
    <section
      id='preview'
      className='h-full w-full max-w-full max-h-full flex flex-col gap-4 items-center justify-center p-4 overflow-auto bg-transparent'
    >
      <div className='w-full flex justify-start items-center h-fit'>
        <button
          className='w-10 h-10 bg-neutral-900 cursor-pointer flex justify-center items-center rounded-lg'
          onClick={fullScreenPreview}
        >
          <div className='size-5 flex items-center justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            </svg>
          </div>
        </button>
      </div>
      <main id='horarios' className='w-full h-fit gap-1 bg-neutral-900 rounded-xl grid grid-cols-6 px-4 py-3 text-center [&>*:not(.recreo)]:w-full [&>*:not(.recreo)]:overflow-hidden [&>*:not(.recreo):not(.void)]:border [&>*:not(.recreo):not(.void)]:border-neutral-600 [&>*:not(.recreo)]:rounded-lg [&>*:not(.recreo)]:flex [&>*:not(.recreo)]:items-center [&>*:not(.recreo)]:justify-center'>
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
              <div key={`hora-${hora.inicio}-${hora.fin}-${idx}`} className='h-8 [grid-column:1] text-sm'>
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
                  className={`${hora.hora === '' ? 'void' : ''} h-full w-full text-xs rounded-lg font-semibold hover:bg-[var(--color)]`}
                >
                  {hora.hora}
                </span>
              )
            })
          })
        }
      </main>
    </section>
  )
}
