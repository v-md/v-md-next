import {
  Editor,
  EditorViewModel,
} from '@v-md/core'

const editor = new Editor().addModel(new EditorViewModel())
const model = editor.getModel('layout-editor')
model.mount('#app')
