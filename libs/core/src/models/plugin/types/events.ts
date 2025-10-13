import type { Func } from '@v-md/shared'
import type { Editor } from '../../editor'
import type { Model } from '../../model'
import type { Plugin } from '../plugin'

/** 插件的声明周期钩子 */
export interface PluginEvents {
  /**
   * 当数据模块准备好时触发。
   * @param editor 编辑器对象
   * @returns
   */
  onModelReady?: (editor: Editor, model: Model) => void

  /**
   * 当数据模块从编辑器中移除时触发
   * @param editor 编辑器对象
   * @returns
   */
  onModelRemoved?: (editor: Editor, model: Model) => void

  /**
   * 当 UI 模块注册到编辑器时触发
   * @param editor 编辑器对象
   * @param uiModule 当前注册的 UI 模块
   */
  onViewReady?: (editor: Editor, uiModule: any) => void

  /**
   * 当 UI 模块从编辑器中移除时触发
   * @param editor 编辑器对象
   * @param uiModule 当前移除的 UI 模块
   */
  onViewRemoved?: (editor: Editor, uiModule: any) => void

  /**
   * 当插件注册到编辑器时触发。
   * @param editor 编辑器对象
   * @param plugin 当前注册的插件
   */
  onPluginReady?: (editor: Editor, plugin: Plugin) => void

  /**
   * 插件从编辑器中移除前触发。
   * @param editor 编辑器对象
   * @param plugin 当前移除的插件
   */
  onPluginRemoved?: (editor: Editor, plugin: Plugin) => void
}

export type PluginEventNames = keyof PluginEvents

/** 获取某个插件钩子的参数 */
export type PluginEventParams<T extends PluginEventNames = PluginEventNames> =
  Exclude<PluginEvents[T], undefined> extends Func ? Parameters<Exclude<PluginEvents[T], undefined>> : []
