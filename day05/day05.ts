export const part1 = (input: string) => {
	const lines = input.split('\n')
	const stacks = {
		1: 'JHGMZNTF',
		2: 'VWJ',
		3: 'GVLJBTH',
		4: 'BPJNCDVL',
		5: 'FWSMPRG',
		6: 'GHCFBNVM',
		7: 'DHGMR',
		8: 'HNMVZD',
		9: 'GNFH',
	}
	const rearrangeProcedures = lines.slice(10)

	rearrangeProcedures.forEach((rearrangeProcedure) => {
		if (!rearrangeProcedure) return

		const { move, from, to } = getMoveFromTo(rearrangeProcedure)
		const fromStack = stacks[from]
		const toStack = stacks[to]
		const fromStr = fromStack.slice(fromStack.length - move)
		stacks[to] = toStack + fromStr.split('').reverse().join('')
		stacks[from] = fromStack.slice(0, fromStack.length - move)
	})
	return Object.values(stacks).reduce((acc, stack) => {
		return acc + stack[stack.length - 1]
	}, '')
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	const stacks = {
		1: 'JHGMZNTF',
		2: 'VWJ',
		3: 'GVLJBTH',
		4: 'BPJNCDVL',
		5: 'FWSMPRG',
		6: 'GHCFBNVM',
		7: 'DHGMR',
		8: 'HNMVZD',
		9: 'GNFH',
	}
	const rearrangeProcedures = lines.slice(10)

	rearrangeProcedures.forEach((rearrangeProcedure) => {
		if (!rearrangeProcedure) return

		const { move, from, to } = getMoveFromTo(rearrangeProcedure)
		const fromStack = stacks[from]
		const toStack = stacks[to]
		const fromStr = fromStack.slice(fromStack.length - move)
		stacks[to] = toStack + fromStr
		stacks[from] = fromStack.slice(0, fromStack.length - move)
	})
	return Object.values(stacks).reduce((acc, stack) => {
		return acc + stack[stack.length - 1]
	}, '')
}

const getMoveFromTo = (rearrangeProcedure: string) => {
	const move = +rearrangeProcedure.split('move ')[1].split(' ')[0]
	const from = +rearrangeProcedure.split('from ')[1].split(' ')[0]
	const to = +rearrangeProcedure.split('to ')[1].split(' ')[0]
	return { move, from, to }
}
