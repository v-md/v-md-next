import type { Editor } from '@v-md/core'
import type { FC } from 'react'

export const LayoutEditor: FC<{ editor: Editor }> = ({ editor }) => {
  console.log(editor)
  return (
    <>
      <div>Hello World</div>
      <h1>Hello World</h1>
      <h2>Hello World</h2>
    </>
  )
}
