import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useEffect } from 'react'
import {
  useConfig,
  useNamespace,
} from '../../../hooks'
import { LayoutBottom } from './layout-bottom'
import { LayoutCenter } from './layout-center'
import { LayoutTop } from './layout-top'
import '../styles/layout.scss'

export const Layout: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout')
  const [layoutAttrs] = useConfig(editor, 'layoutAttrs')

  const layoutView = editor.getModel('layout-view')
  useEffect(() => {
    layoutView.onMounted()
  }, [])

  return (
    <div {...layoutAttrs} className={c()}>
      <LayoutTop editor={editor}></LayoutTop>
      <LayoutCenter editor={editor}></LayoutCenter>
      <LayoutBottom editor={editor}></LayoutBottom>
    </div>
  )
}
