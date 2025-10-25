import type { Editor } from '@v-md/core'
import type { FC } from 'react'
import { Allotment, LayoutPriority } from 'allotment'
import { useNamespace } from '../../../hooks'
import { LayoutActivity } from './layout-activity'
import { LayoutMain } from './layout-main'
import { LayoutSidePrimary } from './layout-side-primary'
import { LayoutSideSecondary } from './layout-side-secondary'
import 'allotment/dist/style.css'
import '../styles/layout-center.scss'

export const LayoutCenter: FC<{ editor: Editor }> = ({ editor }) => {
  const { c } = useNamespace(editor, 'layout-center')

  return (
    <div className={c()}>
      <Allotment
        proportionalLayout={false}
      >
        <Allotment.Pane minSize={48} maxSize={48} snap={false}>
          <LayoutActivity editor={editor} />
        </Allotment.Pane>
        <Allotment.Pane
          minSize={170}
          priority={LayoutPriority.Low}
          preferredSize={300}
          snap
        >
          <LayoutSidePrimary editor={editor} />
        </Allotment.Pane>
        <Allotment.Pane minSize={300} priority={LayoutPriority.High}>
          <LayoutMain editor={editor} />
        </Allotment.Pane>
        <Allotment.Pane
          minSize={170}
          priority={LayoutPriority.Low}
          preferredSize={300}
          snap
        >
          <LayoutSideSecondary editor={editor} />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
