import type { ConfigsModel } from '../../configs'

export interface EditorModels {
  configs: ConfigsModel
}

export type EditorModelName = keyof EditorModels
