import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-bottom.scss'

export const LayoutBottom: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-bottom')

  return (
    <div className={c()}>
      <div className={c('left')}>2</div>
      <div className={c('right')}>4</div>
    </div>
  )
}
