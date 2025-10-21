import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { useNamespace } from '../../../hooks'
import '../styles/layout-top.scss'

export const LayoutTop: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-top')

  return (
    <div className={c()}>
      <div className={c('left')}>2</div>
      <div className={c('center')}>3</div>
      <div className={c('right')}>4</div>
    </div>
  )
}
