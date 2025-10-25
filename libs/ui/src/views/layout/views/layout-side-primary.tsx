import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-side-primary.scss'

export const LayoutSidePrimary: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-side-primary')

  return (
    <div className={c()}>
      <div className={c('header')}>
        <h3>文件资源管理器</h3>
      </div>
      <div className={c('content')}>
        <div className={c('tree-item')}>📁 src</div>
        <div className={c('tree-item')}>📁 components</div>
        <div className={c('tree-item')}>📄 index.tsx</div>
        <div className={c('tree-item')}>📄 App.tsx</div>
      </div>
    </div>
  )
}
