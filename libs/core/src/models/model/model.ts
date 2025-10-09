import type {
  Editor,
  EditorModelName,
} from '../editor'
import { EDITOR_ERR_MSG } from '../editor'

export class Model {
  private _editor?: Editor

  /** 编辑器实例 */
  get editor() {
    if (!this._editor) {
      throw new Error(EDITOR_ERR_MSG.NOT_READY)
    }
    return this._editor
  }

  /** 数据名称，用于在编辑器索引对应的数据 */
  name: EditorModelName

  /**
   * 编辑器基础数据模块
   * @param name 模块名称
   */
  constructor(name: EditorModelName) {
    this.name = name
  }

  bind(editor: Editor) {
    this._editor = editor
    this.editor.triggerSync('onModelReady', this.editor, this)
  }

  unbind() {
    this.editor.triggerSync('onModelRemoved', this.editor, this)
    delete this._editor
  }
}
