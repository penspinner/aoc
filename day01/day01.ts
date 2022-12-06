const sum = (nums: number[]) => nums.reduce((total, num) => total + num, 0)

export const part1 = (input: string) => {
	const lines = input.split('\n\n')
	const elveTotals = getElfCalorieTotals(lines)
	return Math.max(...elveTotals)
}

// Part 2

export const part2 = (input: string) => {
	const lines = input.split('\n\n')
	const elfCaloriesTotals = getElfCalorieTotals(lines)
	return sum(elfCaloriesTotals.sort().slice(-3))
}
// console.log(sum([...elveTotals].sort().slice(-3)));

const getElfCalorieTotals = (lines: string[]) => {
	return lines.map((line) => {
		const elfCalories = line.split('\n').map(Number)
		const elfTotalCalories = sum(elfCalories)
		return elfTotalCalories
	})
}
