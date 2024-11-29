import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day02'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1('2x3x4')).toBe(58)
	expect(part1('1x1x10')).toBe(43)
})

test('part1', () => {
	expect(part1(inputString)).toBe(1586300)
})

test('part2 examples', () => {
	expect(part2('2x3x4')).toBe(34)
})

test('part2', () => {
	expect(part2(inputString)).toBe(3737498)
})
