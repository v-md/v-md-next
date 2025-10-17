import type {
  SequencePositionOptions,
} from '@v-md/shared'
import type { Model } from '../model'
import type {
  Plugin,
  PluginEventParams,
  PluginEvents,
} from '../plugin'
import type {
  EditorModelName,
  EditorModels,
} from './types'
import {
  EventEmitter,
  getItemFromSequence,
  insertIntoSequence,
  removeFromSequence,
} from '@v-md/shared'
import { EDITOR_ERR_MSG } from './utils'

export class Editor extends EventEmitter<PluginEvents> {
  constructor() {
    super()
  }

  private _modelMap: Partial<EditorModels> = {}

  /**
   * 根据名称搜索数据模块
   * @param name 模块名称
   * @returns 数据模块对象。如果未找到，则返回 `null`
   */
  findModel<T extends EditorModelName = EditorModelName>(name: T): EditorModels[T] | null {
    const target = this._modelMap[name]
    if (!target) {
      return null
    }
    return target
  }

  /**
   * 根据名称获取数据模块，未找到则抛出错误
   * @param name 模块名称
   * @returns 数据模块对象。
   */
  getModel<T extends EditorModelName = EditorModelName>(name: T): EditorModels[T] {
    const target = this.findModel<T>(name)
    if (!target) {
      throw new Error(EDITOR_ERR_MSG.MODEL_NOT_FOUND(name))
    }
    return target
  }

  /**
   * 插入模块
   * @param model 模块对象
   */
  addModel(model: Model) {
    const modelExisted = this.findModel(model.name)
    if (modelExisted) {
      console.warn(EDITOR_ERR_MSG.MODEL_DUPLICATED(model.name))
      return this
    }

    this._modelMap[model.name] = model as any
    model.bind(this)
    return this
  }

  /**
   * 移除模块。
   * @param name 模块名称
   */
  removeModel<T extends EditorModelName = EditorModelName>(name: T) {
    const targetModel = this.findModel(name)
    if (!targetModel) {
      console.warn(EDITOR_ERR_MSG.MODEL_NOT_FOUND(name))
      return this
    }

    delete this._modelMap[name]
    targetModel.unbind()
    return this
  }

  /** 插件列表 */
  private _plugins: Plugin[] = []

  /**
   * 根据插件名称搜索插件
   * @param name 插件名称
   * @returns 插件对象。如果未找到，则返回 `null`
   */
  getPlugin(name: string) {
    const target = getItemFromSequence(this._plugins, name)
    if (!target) {
      return null
    }
    return target
  }

  /**
   * 注册插件
   * @param plugin 插件对象
   * @param options 插件插入位置选项
   * @returns 编辑器实例，支持链式调用
   */
  addPlugin(plugin: Plugin, options?: SequencePositionOptions) {
    const isSuccess = insertIntoSequence(this._plugins, plugin, {
      onDuplicate: () => {
        console.warn(EDITOR_ERR_MSG.PLUGIN_DUPLICATED(plugin.name))
      },
      onMissingTarget: (targetName) => {
        console.warn(EDITOR_ERR_MSG.PLUGIN_INSERT_WARN(targetName, plugin.name))
      },
      ...options,
    })

    if (isSuccess) {
      plugin.bind(this)
    }
    return this
  }

  /**
   * 卸载插件
   * @param name 插件名称
   * @returns 编辑器实例，支持链式调用
   */
  removePlugin(name: string) {
    removeFromSequence(this._plugins, name, {
      onNotFound: () => {
        console.warn(EDITOR_ERR_MSG.PLUGIN_NOT_FOUND(name))
      },
      onBeforeRemove: (targetPlugin) => {
        targetPlugin.unbind()
      },
    })

    return this
  }

  /**
   * 异步触发某个生命周期事件
   * @param name 生命周期名称
   * @param args 触发参数
   */
  async trigger<T extends keyof PluginEvents>(
    name: T,
    ...args: PluginEventParams<T>
  ) {
    for (let i = 0; i < this._plugins.length; i++) {
      const plugin = this._plugins[i]
      await plugin.trigger(name, ...args)
    }
    await this.emit(name, ...args)
  }

  /**
   * 同步触发某个生命周期事件
   * @param name 生命周期名称
   * @param args 触发参数
   */
  triggerSync<T extends keyof PluginEvents>(
    name: T,
    ...args: PluginEventParams<T>
  ) {
    for (let i = 0; i < this._plugins.length; i++) {
      const plugin = this._plugins[i]
      plugin.triggerSync(name, ...args)
    }
    this.emitSync(name, ...args)
  }
}
