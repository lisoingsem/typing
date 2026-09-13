import type { ClusterResult, ComparisonMode } from '~/types/typing'
import type { KhmerComparison } from '~/types/khmer'
import { isBoundaryCluster, isKhmerCluster, segmentKhmer } from './graphemes'
import { normalizeKhmer } from './normalize'

export function compareKhmer(expected: string, typed: string, mode: ComparisonMode = 'normal'): KhmerComparison {
  const left = mode === 'normal' ? normalizeKhmer(expected) : expected
  const right = mode === 'normal' ? normalizeKhmer(typed) : typed
  return { equal: left === right, expected: left, typed: right, mode }
}

interface CompareOptions {
  mode?: ComparisonMode
  composing?: boolean
  commitPending?: boolean
}

/**
 * Compare display clusters. The last Khmer cluster remains pending while it can
 * still become the expected cluster, or until a boundary/next cluster commits it.
 */
export function compareClusters(target: string, input: string, options: CompareOptions = {}): ClusterResult[] {
  const mode = options.mode ?? 'normal'
  const expectedClusters = segmentKhmer(target)
  const typedClusters = segmentKhmer(input)
  const results: ClusterResult[] = expectedClusters.map(expected => ({ expected, typed: '', state: 'untouched' }))

  for (let index = 0; index < Math.max(expectedClusters.length, typedClusters.length); index++) {
    const expected = expectedClusters[index] ?? ''
    const typed = typedClusters[index] ?? ''
    if (!results[index]) results[index] = { expected, typed, state: 'incorrect' }
    if (!typed) continue

    const comparison = compareKhmer(expected, typed, mode)
    if (comparison.equal) {
      results[index] = { expected, typed, state: 'correct' }
      continue
    }

    const isLast = index === typedClusters.length - 1
    const nextClusterCommits = typedClusters[index + 1] !== undefined
    const normalizedExpected = mode === 'normal' ? normalizeKhmer(expected) : expected
    const normalizedTyped = mode === 'normal' ? normalizeKhmer(typed) : typed
    const canGrowIntoExpected = normalizedExpected.startsWith(normalizedTyped)
    const unfinishedKhmer = isKhmerCluster(typed) && !isBoundaryCluster(typed)
    const pending = isLast && !nextClusterCommits && !options.commitPending && unfinishedKhmer
      && (options.composing || canGrowIntoExpected || normalizedTyped.length <= normalizedExpected.length)

    results[index] = { expected, typed, state: pending ? 'pending' : 'incorrect' }
  }

  return results
}
