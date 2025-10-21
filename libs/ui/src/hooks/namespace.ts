import type { Editor } from '@v-md/core'
import {
  cssClassName,
  cssVarName,
} from '@v-md/shared'
import { useConfig } from './config'

export function useNamespace(editor: Editor, prefix: string = '') {
  const [namespace = '', setNamespace] = useConfig(editor, 'namespace')

  function c(...names: string[]) {
    if (prefix) {
      names.unshift(prefix)
    }
    return cssClassName(namespace, ...names)
  }

  function v(...names: string[]) {
    if (prefix) {
      names.unshift(prefix)
    }
    return cssVarName(namespace, ...names)
  }

  return {
    namespace,
    setNamespace,
    c,
    v,
  }
}
