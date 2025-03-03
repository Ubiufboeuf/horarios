import { Editor } from './Editor'
import { FullScreenResult } from './FullScreenResult'
import { Preview } from './Preview'

function App() {
  return (
    <>
      <main className='w-full h-[600px] max-h-full max-w-screen-xl grid grid-cols-[1fr_512px] place-items-center gap-4'>
        <Preview />
        <Editor />
        <FullScreenResult />
      </main>
    </>
  )
}

export default App
