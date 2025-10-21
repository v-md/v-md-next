import type { Editor } from '@v-md/core'
import type { HTMLAttributes } from 'react'
import { ViewModel } from '@v-md/core'
import { createRoot } from 'react-dom/client'
import { Layout } from '../views'

declare module '@v-md/core' {
  interface EditorModels {
    'layout-view': LayoutViewModel
  }

  interface ConfigOptions {
    /**
     * 编辑器根节点属性
     * @default {}
     */
    layoutAttrs: HTMLAttributes<HTMLDivElement>
  }
}

export class LayoutViewModel extends ViewModel {
  constructor() {
    super('layout-view')
  }

  /** @override */
  template() {
    const rootDom = document.createElement('div')
    rootDom.id = 'vmd-app'
    const root = createRoot(rootDom)
    root.render(<Layout editor={this.editor} />)
    return rootDom
  }

  bind(editor: Editor) {
    const configs = editor.getModel('configs')
    configs.set('layoutAttrs', {}, false)

    super.bind(editor)
  }
}
