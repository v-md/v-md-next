import { createRoot } from 'react-dom/client'
import { ViewModel } from '../../models'
import { Editor as EditorLayout } from './editor'

export class EditorViewModel extends ViewModel {
  constructor() {
    super('layout-editor')
  }

  async template() {
    const rootDom = document.createElement('div')
    const root = createRoot(rootDom)
    root.render(<EditorLayout editor={this.editor} />)
    return rootDom
  }
}
