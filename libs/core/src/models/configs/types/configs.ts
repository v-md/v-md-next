export interface ConfigOptions {
  /**
   * 命名空间
   * @default 'vmd'
   */
  namespace?: string
}

export type ConfigNames = keyof ConfigOptions
