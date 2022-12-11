type Monkey = {
	inspectedItemsCount: number
	items: number[]
	operation: {
		leftOperand: string
		rightOperand: string
		operator: string
	}
	test: {
		divisibleBy: number
		divisibleByTrue: number
		divisibleByFalse: number
	}
}

export const part1 = (input: string) => {
	return getMonkeyBusinessLevel(input, 3, 20)
}

export const part2 = (input: string) => {
	return getMonkeyBusinessLevel(input, 1, 10000)
}

const getMonkeyBusinessLevel = (input: string, worryReducer: number, rounds: number) => {
	const monkeys = parseMonkeys(input)
	const lowestCommonMulitple = Object.values(monkeys).reduce(
		(currentLowestCommonMultiple, monkey) =>
			getLowestCommonMulitple(currentLowestCommonMultiple, monkey.test.divisibleBy),
		1,
	)

	for (let i = 0; i < rounds; i++) {
		Object.values(monkeys).forEach((monkey) => {
			monkey.items.forEach((item) => {
				monkey.inspectedItemsCount++
				const leftOperand =
					monkey.operation.leftOperand === 'old' ? item : +monkey.operation.leftOperand
				const rightOperand =
					monkey.operation.rightOperand === 'old' ? item : +monkey.operation.rightOperand
				let newWorryLevel =
					monkey.operation.operator === '*'
						? leftOperand * rightOperand
						: leftOperand + rightOperand
				newWorryLevel = Math.floor(newWorryLevel / worryReducer)
				newWorryLevel = worryReducer > 1 ? newWorryLevel : newWorryLevel % lowestCommonMulitple

				if (newWorryLevel % monkey.test.divisibleBy === 0) {
					monkeys[monkey.test.divisibleByTrue].items.push(newWorryLevel)
				} else {
					monkeys[monkey.test.divisibleByFalse].items.push(newWorryLevel)
				}
			})
			monkey.items = []
		})
	}

	// Top two monkeys item inspection count multiplied together.
	const [monkeyMostInspected, monkeySecondMostInspected] = Object.values(monkeys).sort(
		(monkeyA, monkeyB) => monkeyB.inspectedItemsCount - monkeyA.inspectedItemsCount,
	)

	return monkeyMostInspected.inspectedItemsCount * monkeySecondMostInspected.inspectedItemsCount
}

const parseMonkeys = (input: string) => {
	const monkeyStrings = input.split('\n\n')
	const monkeys = monkeyStrings.reduce<Record<number, Monkey>>((monkeys, monkeyString) => {
		const monkeyInstructions = monkeyString.split('\n')
		const monkeyNumber = +monkeyInstructions[0].split('Monkey ')[1].replace(':', '')
		const monkeyStartingItems = monkeyInstructions[1]
			.replace('Starting items: ', '')
			.split(', ')
			.map(Number)
		const monkeyOperation = (() => {
			const [leftOperand, operator, rightOperand] = monkeyInstructions[2]
				.replace('Operation: new = ', '')
				.trim()
				.split(' ')
			return { leftOperand, operator, rightOperand }
		})()
		const monkeyTest = (() => {
			const divisibleBy = +monkeyInstructions[3].replace('Test: divisible by ', '').trim()
			const divisibleByTrue = +monkeyInstructions[4].replace('If true: throw to monkey ', '').trim()
			const divisibleByFalse = +monkeyInstructions[5]
				.replace('If false: throw to monkey ', '')
				.trim()
			return { divisibleBy, divisibleByTrue, divisibleByFalse }
		})()
		monkeys[monkeyNumber] = {
			inspectedItemsCount: 0,
			items: monkeyStartingItems,
			operation: monkeyOperation,
			test: monkeyTest,
		}
		return monkeys
	}, {})
	return monkeys
}

const getLowestCommonMulitple = (x: number, y: number) => {
	return (x * y) / getGreatestCommonDenominator(x, y)
}

const getGreatestCommonDenominator = (x: number, y: number) => {
	let [max, min] = y > x ? [x, y] : [y, x]

	while (true) {
		const res = max % min
		if (res == 0) return min

		max = min
		min = res
	}
}
