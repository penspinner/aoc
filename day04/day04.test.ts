import { expect, test } from 'vitest'
import { part1, part2 } from './day04'
import fs from 'fs'
import path from 'path'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.csv'), {
	encoding: 'utf-8',
})

test('part1', () => {
	expect(part1(inputString)).toBe(651)
})

test('part2', () => {
	expect(part2(inputString)).toBe(956)
})
