import type { ConfigNames, ConfigOptions } from './types'
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
          key as ConfigNames,
          value,
          oldValue,
        )
        return res
      },
    })
    return proxy
  }

  /**
   * 获取配置项的值
   * @param key 配置项名称
   */
  get<T extends ConfigNames>(key: T) {
    return this._configs[key]
  }

  /** 获取配置对象 */
  getConfigs() {
    return this._configs
  }

  /**
   * 修改配置项的值
   * @param key 配置项名称
   * @param value 设置的值
   * @param proxy 是否修改代理对象，触发全局事件。默认为 true
   */
  set<T extends ConfigNames>(key: T, value: ConfigOptions[T], proxy: boolean = true) {
    const target = proxy ? this._configsProxy : this._configs
    target[key] = value
    return this
  }

  /**
   * 配置批量修改
   * @param options 新的配置对象
   * @param proxy 是否修改代理对象，触发全局事件。默认为 true
   */
  setConfigs(options: ConfigOptions, proxy: boolean = true) {
    const target = proxy ? this._configsProxy : this._configs
    Object.assign(target, options)
    return this
  }
}
