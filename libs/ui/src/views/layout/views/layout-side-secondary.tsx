import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-side-secondary.scss'

export const LayoutSideSecondary: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-side-secondary')

  return (
    <div className={c()}>
      <div className={c('header')}>
        <h3>大纲</h3>
      </div>
      <div className={c('content')}>
        <div className={c('outline-item')}>📄 App.tsx</div>
        <div className={c('outline-item', 'level-1')}>  ├── function App()</div>
        <div className={c('outline-item', 'level-2')}>  │   ├── const [count, setCount]</div>
        <div className={c('outline-item', 'level-2')}>  │   └── return ()</div>
        <div className={c('outline-item')}>📄 main.tsx</div>
      </div>
    </div>
  )
}
