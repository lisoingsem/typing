export type TestMode = 'time' | 'words' | 'quote'
export type ComparisonMode = 'normal' | 'strict'
export type ClusterState = 'untouched' | 'correct' | 'incorrect' | 'pending'

export interface ClusterResult {
  expected: string
  typed: string
  state: ClusterState
}

export interface TestResult {
  id: string
  createdAt: string
  mode: TestMode
  parameter: number
  wpm: number
  rawWpm: number
  accuracy: number
  consistency: number
  correct: number
  incorrect: number
  duration: number
  samples: number[]
}
