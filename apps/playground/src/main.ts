import { ConfigsModel, definePlugin, Editor } from '@v-md/core'
import { LayoutViewModel } from '@v-md/ui'

const editor = new Editor()
  .addModel(new ConfigsModel())
  .addModel(new LayoutViewModel())
  .addPlugin(definePlugin({
    name: 'aaa',
    onViewMounted(editor, view) {
      console.log(editor, view, document.querySelector('.vmd-layout-top'))
    },
  }))
  .model('configs', (configs) => {
    configs.set('layoutAttrs', {
      style: { height: '100vh' },
    })
  })
  .model('layout-view', (view) => {
    view.mount('#app', 'replace')
  })
