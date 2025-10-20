import type { ConfigOptions } from './types'
import { Model } from '../model'
import { defaultConfigs } from './default-configs'

export class ConfigsModel extends Model {
  private _configs: ConfigOptions = defaultConfigs()

  private _configsProxy: ConfigOptions

  constructor() {
    super('configs')
    this._configsProxy = this._init()
  }

  private _init() {
    const proxy = new Proxy<ConfigOptions>(this._configs, {
      set: (target, key, value, receiver) => {
        const oldValue = target[key as keyof ConfigOptions]
        const res = Reflect.set(target, key, value, receiver)
        this.editor.triggerSync(
          'onConfigUpdated',
          this.editor,
          key as string,
          value,
          oldValue,
        )
        return res
      },
    })
    return proxy
  }

  /**
   * 配置修改
   * @param options 新的配置对象
   * @param proxy 是否修改代理对象，触发全局事件。默认为 true
   */
  set(options: ConfigOptions, proxy: boolean = true) {
    const target = proxy ? this._configsProxy : this._configs
    Object.assign(target, options)
  }

  /** 获取配置对象 */
  getConfigs() {
    return this._configs
  }
}
