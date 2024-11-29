import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day05'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString)).toBe('CMZ')
})

test('part1', () => {
	expect(part1(inputString)).toBe('TDCHVHJTG')
})

test('part2', () => {
	expect(part2(exampleString)).toBe('MCD')
})

test('part2', () => {
	expect(part2(inputString)).toBe('NGCMPJLHV')
})
