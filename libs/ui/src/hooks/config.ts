import type { ConfigNames, ConfigOptions, Editor } from '@v-md/core'
import { useEffect, useState } from 'react'

export function useConfig<T extends ConfigNames>(editor: Editor, configName: T) {
  const configs = editor.getModel('configs')
  const [config, setConfig] = useState(() => configs.get(configName))

  function configUpdatedHandler(_e: Editor, key: ConfigNames, value: any) {
    if (key !== configName) {
      return
    }
    setConfig(value)
  }

  useEffect(() => {
    editor.on('onConfigUpdated', configUpdatedHandler)

    return () => {
      editor.off('onConfigUpdated', configUpdatedHandler)
    }
  }, [])

  return [config, setConfig] as ReturnType<typeof useState<ConfigOptions[T]>>
}
