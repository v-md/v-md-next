import type { PluginEvents } from './events'

export interface PluginDefineOptions extends PluginEvents {
  /** 插件名称 */
  name: string
}
