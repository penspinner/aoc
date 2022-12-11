import { describe, expect, test } from 'vitest'
import { part1, part2 } from './day04'

describe.skip("skip these because they're too slow", () => {
	test('part1 examples', () => {
		expect(part1('abcdef')).toBe(609043)
	})

	test('part1', () => {
		expect(part1('iwrupvqb')).toBe(346386)
	})

	test('part2 examples', () => {
		expect(part2('abcdef')).toBe(6742839)
	})

	test('part2', () => {
		expect(part2('iwrupvqb')).toBe(9958218)
	})
})
