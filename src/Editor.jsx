import { useRef } from 'react'
import { useMateriasStore } from './useMateriasStore'
import { useEffect } from 'react'
import { getMaterias, saveMaterias } from './client'

const opciones = [
  '(vacío)',
  'Sociología',
  'Cálculo',
  'Emprendurismo y Gestión',
  'Filosofía',
  'Física Mecánica Clásica',
  'Ingeniería de Software',
  'Inglés',
  'Tutoría Proyecto UTULAB',
  'Matemática CTS',
  'Programación Full Stack',
  'Admin. Sis. Op.',
  'Inteligencia Artificial'
]

const dias = {
  'Lunes': 0,
  'Martes': 1,
  'Miércoles': 2,
  'Jueves': 3,
  'Viernes': 4,
}

let dia = 'Lunes'

export function Editor () {
  const updateMateriasObject = useMateriasStore((state) => state.updateMateriasObject)
  const materiasObject = useMateriasStore((state) => state.materiasObject)
  const editorRef = useRef()
  const headerRef = useRef()

  useEffect(() => {
    let materias
    getMaterias()
      .then(data => {
        console.log('data:', data)
        const materias = data
        updateMateriasObject(materias)
      })
  }, [])

  function guardarHorarios () {
    const filas = editorRef.current.querySelectorAll('.fila-de-opcion')
    const json = [...materiasObject]
    
    filas.forEach(fila => {
      const $numeroDeOpcion = fila.querySelector('.numero-de-opcion')
      const $select = fila.querySelector('select')

      const indiceDeOpcion = Number($numeroDeOpcion.getAttribute('data-idx'))
      const opcion = $select.selectedOptions[0].textContent

      const numeroDeDia = dias[dia]

      json[numeroDeDia].horas[indiceDeOpcion] = opcion
    })
    updateMateriasObject(json)
    saveMaterias(JSON.stringify(json))
  }

  function getDefaultValue (idx) {
    const json = [...materiasObject]
    const numeroDeDia = dias[dia]

    return json[numeroDeDia].horas[idx]
  }

  function cambiarSelects (dia) {
    const filas = editorRef.current.querySelectorAll('.fila-de-opcion')
    const json = [...materiasObject]
    const numeroDeDia = dias[dia]

    filas.forEach(fila => {
      const $numeroDeOpcion = fila.querySelector('.numero-de-opcion')
      const $select = fila.querySelector('select')
  
      const indiceDeOpcion = Number($numeroDeOpcion.getAttribute('data-idx'))
      
      $select.value = json[numeroDeDia].horas[indiceDeOpcion]
    })

  }

  function changeDay (event) {
    const { target } = event
    dia = target.textContent
    cambiarSelects(dia)
    const arr = [...headerRef.current.children]
    arr.forEach(c => c.removeAttribute('data-active'))
    target.setAttribute('data-active', 'true')
    const idx = Number(target.getAttribute('data-idx'))
    const left = -160 * (idx)
    headerRef.current.setAttribute('style', `left: ${left}px`)
  }
  
  return (
    <section
      id='editor'
      ref={editorRef}
      className='h-full w-full max-w-full max-h-full flex flex-col items-center p-4 overflow-y-auto overflow-x-hidden bg-neutral-900 rounded-xl gap-12'
    >
      <header ref={headerRef} className='
        h-20 min-h-20 w-full flex justify-around gap-4 flex-wrap 
        [&>button]:w-28 [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:rounded-md [&>button]:font-bold [&>button]:cursor-pointer [&>button[data-active]]:bg-neutral-800 [&>button]:transition-colors [&>button]:flex-auto
      '>
          <button onClick={changeDay} data-idx={0} data-active='true'>Lunes</button>
          <button onClick={changeDay} data-idx={1}>Martes</button>
          <button onClick={changeDay} data-idx={2}>Miércoles</button>
          <button onClick={changeDay} data-idx={3}>Jueves</button>
          <button onClick={changeDay} data-idx={4}>Viernes</button>
      </header>
      <main className='h-full w-full flex-1 flex flex-col gap-3'>
        {
          Array(11).fill('hora').map((hora, idx) => {
            if (idx === 2 || idx === 4 || idx === 7) {
              return
            }
            let idx2 = idx
            if (idx > 2) idx2 -= 1
            if (idx > 4) idx2 -= 1
            if (idx > 7) idx2 -= 1
            return (
              <div
                key={`editor-${hora}-${idx}`}
                className='fila-de-opcion w-full h-8 min-h-8 grid grid-cols-[128px_1fr] [&>*]:h-8 [&>*]:max-h-full place-content-between overflow-hidden gap-4'
              >
                <div data-idx={idx} className='numero-de-opcion flex w-32 h-full items-center justify-start px-4'>
                  Hora Nº{idx2 + 1}
                </div>
                <select
                  onInput={guardarHorarios}
                  className='scheme-dark bg-neutral-900 border-2 border-neutral-500 rounded-lg h-full w-full max-w-full overflow-hidden px-2'
                  value={getDefaultValue(idx)}
                >
                  {
                    opciones.map((opcion, op_idx) => (
                      <option
                        key={`editor-opciones-${opcion}-${op_idx}-${hora}-${idx}`}
                        value={opcion}
                      >
                        {opcion}
                      </option>
                    ))
                  }
                </select>
              </div>
            )
          })
        }
      </main>
    </section>
  )
}
