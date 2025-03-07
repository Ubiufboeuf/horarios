import { Editor } from './Editor'
import { FullScreenResult } from './FullScreenResult'
import { Preview } from './Preview'

function App() {
  return (
    <>
      <main className='w-full h-[600px] min-h-fit max-w-screen-xl max-h-full grid grid-cols-[1fr_512px] place-items-center gap-4 overflow-auto'>
        <Preview />
        <Editor />
      </main>
      <FullScreenResult />
    </>
  )
}

export default App
