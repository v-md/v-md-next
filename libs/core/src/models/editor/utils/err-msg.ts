/** 编辑器相关错误消息 */
export const EDITOR_ERR_MSG = {
  NOT_READY: 'Editor is not ready!',

  MODEL_DUPLICATED: (name: string) => `Model "${name}" has been registered!`,
  MODEL_NOT_FOUND: (name: string) => `Model "${name}" has not been registered!`,

  VIEW_NO_ROOT: (name: string) => `Can not find root element on view "${name}", Editor view is not ready!`,
  VIEW_NO_TARGET: (name: string) => `Can not find target element to mount ui on view "${name}"!`,
  VIEW_DUPLICATED: (name: string) => `View "${name}" has been registered!`,
  VIEW_NOT_FOUND: (name: string) => `View "${name}" has not been registered!`,

  PLUGIN_DUPLICATED: (name: string) => `Plugin "${name}" has been registered!`,
  PLUGIN_NOT_FOUND: (name: string) => `Plugin "${name}" has not been registered!`,
  PLUGIN_INSERT_WARN: (targetPluginName: string, pluginName: string) =>
    `Reference plugin "${targetPluginName}" has not been registered! The plugin "${pluginName}" will be inserted at the end.`,
}
