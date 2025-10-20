import type { Editor } from '@v-md/core'
import {
  cssClassName,
  cssVarName,
} from '@v-md/shared'
import { useState } from 'react'

export function useNamespace(editor: Editor) {
  const configsModel = editor.getModel('configs')
  const configs = configsModel.getConfigs()
  const [namespace, setNamespace] = useState(configs.namespace || '')

  function c(...names: string[]) {
    return cssClassName(namespace, ...names)
  }

  function v(...names: string[]) {
    return cssVarName(namespace, ...names)
  }

  return {
    namespace,
    setNamespace,
    c,
    v,
  }
}
