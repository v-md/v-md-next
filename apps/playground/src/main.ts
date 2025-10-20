import { Editor } from '@v-md/core'
import { LayoutEditorViewModel } from '@v-md/ui'

const editor = new Editor().addModel(new LayoutEditorViewModel())
const model = editor.getModel('layout-editor-view')
model.mount('#app')
