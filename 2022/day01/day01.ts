import { sum } from '../../utils'

export const part1 = (input: string) => {
	const lines = input.split('\n\n')
	const elveTotals = getElfCalorieTotals(lines)
	return Math.max(...elveTotals)
}

export const part2 = (input: string) => {
	const lines = input.split('\n\n')
	const elfCaloriesTotals = getElfCalorieTotals(lines)
	return sum(elfCaloriesTotals.sort((a, b) => a - b).slice(-3))
}

const getElfCalorieTotals = (lines: string[]) => {
	return lines.map((line) => {
		const elfCalories = line.split('\n').map(Number)
		const elfTotalCalories = sum(elfCalories)
		return elfTotalCalories
	})
}
