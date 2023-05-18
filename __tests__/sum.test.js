import { test, expect } from 'vitest'

import { sum } from './sum'

test('1 + 2 = 3', () => {
  // 使用 expect 和 toBe 方法来测试【加和】与预测结果是否一致
  expect(sum(1, 2)).toBe(3)
})
