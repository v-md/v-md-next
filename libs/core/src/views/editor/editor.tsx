import type { FC } from 'react'
import type { Editor as EditorContext } from '../../models'

export const Editor: FC<{ editor: EditorContext }> = ({ editor }) => {
  console.log(editor)
  return (
    <>
      <h1>Hello World</h1>
      <h2>Hello World</h2>
    </>
  )
}
