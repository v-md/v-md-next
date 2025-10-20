import type { ConfigOptions } from './types'

export function defaultConfigs() {
  return {
    namespace: 'vmd',
  } satisfies Required<ConfigOptions>
}
