export const part1 = (input: string) => {
	const { stacks, rearrangeProcedures } = parseStacksAndRearrangeProcedures(input)

	for (const rearrangeProcedure of rearrangeProcedures) {
		if (!rearrangeProcedure) continue

		const { move, from, to } = getMoveFromTo(rearrangeProcedure)
		const fromStack = stacks[from]
		const toStack = stacks[to]
		const fromStr = fromStack.slice(fromStack.length - move)
		stacks[to] = toStack + fromStr.split('').reverse().join('')
		stacks[from] = fromStack.slice(0, fromStack.length - move)
	}

	return getLastLetterOfEachItem(Object.values(stacks))
}

export const part2 = (input: string) => {
	const { stacks, rearrangeProcedures } = parseStacksAndRearrangeProcedures(input)

	for (const rearrangeProcedure of rearrangeProcedures) {
		if (!rearrangeProcedure) continue

		const { move, from, to } = getMoveFromTo(rearrangeProcedure)
		const fromStack = stacks[from]
		const toStack = stacks[to]
		const fromStr = fromStack.slice(fromStack.length - move)
		stacks[to] = toStack + fromStr
		stacks[from] = fromStack.slice(0, fromStack.length - move)
	}

	return getLastLetterOfEachItem(Object.values(stacks))
}

const parseStacksAndRearrangeProcedures = (input: string) => {
	const lines = input.split('\n')
	const stacks: Record<number, string> = {}
	let lineThatContainsStackNums: number | undefined

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (/\d/g.test(line)) {
			// We found the line that contains stack numbers.
			lineThatContainsStackNums = i
			break
		}

		for (let i = 0; i < line.length; i += 4) {
			const crate = line.slice(i, i + 3)

			if (crate === '   ') {
				continue
			}

			const char = crate[1]
			const index = Math.ceil((i + 1) / 4)

			if (!stacks[index]) {
				stacks[index] = char
			} else {
				stacks[index] = char + stacks[index]
			}
		}
	}

	if (lineThatContainsStackNums === undefined) {
		throw new Error('Unable to find line that contains stack numbers.')
	}

	return { stacks, rearrangeProcedures: lines.slice(lineThatContainsStackNums + 2) }
}

const getMoveFromTo = (rearrangeProcedure: string) => {
	const move = +rearrangeProcedure.split('move ')[1].split(' ')[0]
	const from = +rearrangeProcedure.split('from ')[1].split(' ')[0]
	const to = +rearrangeProcedure.split('to ')[1].split(' ')[0]
	return { move, from, to }
}

const getLastLetterOfEachItem = (stacks: string[]) =>
	stacks.reduce((acc, stack) => {
		return acc + stack[stack.length - 1]
	}, '')
