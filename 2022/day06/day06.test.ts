import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day06'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
	expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
	expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
	expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
})

test('part1', () => {
	expect(part1(inputString)).toBe(1816)
})

test('part2 examples', () => {
	expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19)
	expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
	expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
	expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29)
	expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26)
})

test('part2', () => {
	expect(part2(inputString)).toBe(2625)
})
