import { EDITOR_ERR_MSG } from '../editor'
import { Model } from './model'

export class ViewModel extends Model {
  /** HTML 根节点 */
  private _root?: HTMLElement

  /** HTML 根节点 */
  get root() {
    if (!this._root) {
      throw new Error(EDITOR_ERR_MSG.VIEW_NO_ROOT(this.name))
    }
    return this._root
  }

  set root(value: HTMLElement) {
    this._root = value
  }

  /** 初始化 UI 节点的方法，可以被重写  */
  template() {
    return document.createElement('div')
  }

  /** HTML 挂载节点 */
  target: HTMLElement | null = null

  /**
   * UI 挂载到编辑器视图
   * @param el 挂载的目标元素，取值说明如下：
   * - 字符串：将作为选择器，查找页面中对应的元素
   * - HTMLElement：直接使用传入的元素
   * @param type 挂载方式，取值说明如下：
   * - prepend: 向前插入到目标元素的子元素列表
   * - append：向后插入到目标元素的子元素列表
   * - replace：替换目标元素
   */
  mount(el: string | HTMLElement, type: 'append' | 'prepend' | 'replace' = 'append') {
    if (!this._root) {
      this.root = this.template()
    }

    const target = this._getMountTarget(el)
    if (!target) {
      throw new Error(EDITOR_ERR_MSG.VIEW_NO_TARGET(this.name))
    }

    const currentTarget = this.root.parentElement
    // 已经挂载到当前元素
    if (currentTarget === target) {
      return
    }

    if (type === 'append') {
      target.appendChild(this.root)
    }
    else if (type === 'prepend') {
      target.prepend(this.root)
    }
    else {
      target.replaceWith(this.root)
    }
  }

  /**
   * 当组件的 DOM 成功挂载后触发
   *
   * 在 React、Vue 等框架中，这个时机要在组件内部异步获取
   */
  onMounted() {
    this.editor.triggerSync('onViewMounted', this.editor, this)
  }

  /** UI 卸载 */
  unmount() {
    this.root.remove()
    this.editor.triggerSync('onViewUnmounted', this.editor, this)
  }

  /**
   * 获取 UI 挂载目标
   * @param el 挂载的元素，取值说明如下：
   * - 字符串：将作为选择器，查找页面中对应的元素
   * - HTMLElement：直接使用传入的元素
   */
  private _getMountTarget(el: string | HTMLElement) {
    let target: HTMLElement | null = null
    if (typeof el === 'string') {
      target = document.querySelector(el)
    }
    else {
      target = el
    }
    return target
  }
}
