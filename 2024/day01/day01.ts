export const part1 = (input: string) => {
	const { leftList, rightList } = parseNumberLists(input)
	leftList.sort((a, b) => a - b)
	rightList.sort((a, b) => a - b)
	let total = 0

	for (let i = 0; i < leftList.length; i++) {
		total += Math.abs(leftList[i] - rightList[i])
	}

	return total
}

export const part2 = (input: string) => {
	const { leftList, rightList } = parseNumberLists(input)
	const appearancesByNumber = rightList.reduce<Record<string, number>>((acc, num) => {
		acc[num] ??= 0
		acc[num]++
		return acc
	}, {})
	let total = 0

	for (const num of leftList) {
		total += num * (appearancesByNumber[num] ?? 0)
	}

	return total
}

const parseNumberLists = (input: string) => {
	const leftList: number[] = []
	const rightList: number[] = []

	for (const line of input.split('\n')) {
		const [leftNum, rightNum] = line.split('   ')
		leftList.push(Number(leftNum))
		rightList.push(Number(rightNum))
	}

	return { leftList, rightList }
}
