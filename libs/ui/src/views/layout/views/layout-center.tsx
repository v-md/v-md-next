import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-center.scss'

export const LayoutCenter: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-center')

  return (
    <div className={c()}>
    </div>
  )
}
