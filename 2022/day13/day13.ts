type PossiblyNestedNumberList = number[] | number | PossiblyNestedNumberList[]

export const part1 = (input: string) => {
	const pairs = input.split('\n\n')
	return pairs.reduce((total, pair, pairIndex) => {
		const [list1, list2] = pair.split('\n')
		const list1Eval: PossiblyNestedNumberList[] = eval(list1)
		const list2Eval: PossiblyNestedNumberList[] = eval(list2)

		if (areListsInOrder(list1Eval, list2Eval)) {
			return total + pairIndex + 1
		}

		return total
	}, 0)
}

export const part2 = (input: string) => {
	const packet1 = [[2]]
	const packet2 = [[6]]
	const lines: PossiblyNestedNumberList[][] = [
		...input.split('\n').filter(Boolean).map(eval),
		packet1,
		packet2,
	].sort((a, b) => (areListsInOrder(a, b) ? -1 : 1))
	const [packet1Index, packet2Index] = (() => {
		let tempPacket1Index = undefined
		let tempPacket2Index = undefined

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]

			if (line === packet1) {
				tempPacket1Index = i
			} else if (line === packet2) {
				tempPacket2Index = i
			}

			if (tempPacket1Index && tempPacket2Index) {
				return [tempPacket1Index, tempPacket2Index]
			}
		}

		throw new Error('Unable to find packages')
	})()
	return (packet1Index + 1) * (packet2Index + 1)
}

const areListsInOrder = (
	list1: PossiblyNestedNumberList[],
	list2: PossiblyNestedNumberList[],
): boolean | undefined => {
	for (let i = 0; i < list1.length; i++) {
		const left = list1[i]
		const right = list2[i]

		if (right === undefined) {
			return false
		}

		if (typeof left === 'number' && typeof right === 'number') {
			if (left > right) {
				return false
			}

			if (left < right) {
				return true
			}

			continue
		}

		const listsAreInOrder = areListsInOrder(
			Array.isArray(left) ? left : [left],
			Array.isArray(right) ? right : [right],
		)

		if (listsAreInOrder === undefined) {
			continue
		}

		return listsAreInOrder
	}

	if (list1.length === list2.length) {
		// `undefined` means to keep iterating and checking.
		return undefined
	}

	return true
}
