import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-activity.scss'

export const LayoutActivity: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-activity')

  return (
    <div className={c()}>
      111
    </div>
  )
}
