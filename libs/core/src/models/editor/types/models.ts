import type {
  EditorViewModel,
} from '../../../views'
import type { ConfigsModel } from '../../configs'

export interface EditorModels {
  'configs': ConfigsModel

  'layout-editor': EditorViewModel
}

export type EditorModelName = keyof EditorModels
