import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-main.scss'

export const LayoutMain: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-main')

  return (
    <div className={c()}>
      <div className={c('tabs')}>
        <div className={c('tab', 'active')}>📄 index.tsx</div>
        <div className={c('tab')}>📄 App.tsx</div>
        <div className={c('tab')}>📄 main.tsx</div>
      </div>
      <div className={c('editor')}>
        <div className={c('editor-content')}>
          <pre>
            {`import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)`}
          </pre>
        </div>
      </div>
    </div>
  )
}
