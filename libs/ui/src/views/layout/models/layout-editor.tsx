import { ViewModel } from '@v-md/core'
import { createRoot } from 'react-dom/client'
import { LayoutEditor } from '../views'

declare module '@v-md/core' {
  interface EditorModels {
    'layout-editor-view': LayoutEditorViewModel
  }
}

export class LayoutEditorViewModel extends ViewModel {
  constructor() {
    super('layout-editor-view')
  }

  async template() {
    const rootDom = document.createElement('div')
    const root = createRoot(rootDom)
    root.render(<LayoutEditor editor={this.editor} />)
    return rootDom
  }
}
