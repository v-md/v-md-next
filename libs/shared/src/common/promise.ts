import type { Promisable } from './types'
import { isFunction, isPromise } from './type-check'

type ResolvePromiseType<T> = T extends (...args: any[]) => Promisable<infer R> ? R :
  T extends (...args: any[]) => infer R ? R :
    T extends Promise<infer R> ? R : T

type ResolvePromiseTypeParams<T> = T extends (...args: any[]) => any ? Parameters<T> : any[]

/**
 * 将各种数据类型转换为 Promise 对象，用于在组件中控制异步行为。
 * 1. 取得 target 值为转换目标，若 target 为函数，取其返回值做为转换目标。
 * 2. 转换目标为 Promise 对象，原样返回。
 * 3. 转换目标为 false，且 rejectWhenFalse 为 true，返回 Promise.reject(target)。
 * 4. 转换目标为其他类型，返回 Promise.resolve(target)。
 * @param target 转换目标
 * @param rests 若 target 为函数，则作为参数传递给函数
 * @param rejectWhenFalse 当转换目标为 false 时，是否返回 Promise.reject(false)。默认为 false
 */
export function toPromise<T>(
  target: T,
  rests?: ResolvePromiseTypeParams<T>,
  rejectWhenFalse: boolean = false,
): Promise<ResolvePromiseType<T>> {
  if (isFunction(target)) {
    const restArgs = rests || []
    const res = target(...restArgs)
    return toPromise(res, rests, rejectWhenFalse)
  }

  if (isPromise<T>(target))
    return target as Promise<ResolvePromiseType<T>>

  if (rejectWhenFalse && target === false)
    return Promise.reject(target)

  return Promise.resolve(target) as Promise<ResolvePromiseType<T>>
}
