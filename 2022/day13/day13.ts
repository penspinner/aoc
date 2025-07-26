type Packets = number[] | number | Packets[]

export const part1 = (input: string) => {
	const packetsPairs = input.split('\n\n')
	return packetsPairs.reduce((total, packetsPair, packetsPairIndex) => {
		const [packets1, packets2] = packetsPair.split('\n')
		const packets1Eval: Packets[] = JSON.parse(packets1)
		const packets2Eval: Packets[] = JSON.parse(packets2)

		if (areListsInOrder(packets1Eval, packets2Eval)) {
			return total + packetsPairIndex + 1
		}

		return total
	}, 0)
}

export const part2 = (input: string) => {
	const packets1 = [[2]]
	const packets2 = [[6]]
	const packetsList: Packets[][] = [
		...input
			.split('\n')
			.filter(Boolean)
			.map((line) => JSON.parse(line)),
		packets1,
		packets2,
	].sort((a, b) => (areListsInOrder(a, b) ? -1 : 1))
	const [packet1Index, packet2Index] = (() => {
		let tempPackets1Index: number | undefined
		let tempPackets2Index: number | undefined

		for (const [i, packets] of packetsList.entries()) {
			if (packets === packets1) {
				tempPackets1Index = i
			} else if (packets === packets2) {
				tempPackets2Index = i
			}

			if (tempPackets1Index && tempPackets2Index) {
				return [tempPackets1Index, tempPackets2Index]
			}
		}

		throw new Error('Unable to find packages')
	})()
	return (packet1Index + 1) * (packet2Index + 1)
}

const areListsInOrder = (packets1: Packets[], packets2: Packets[]): boolean | undefined => {
	for (let i = 0; i < packets1.length; i++) {
		const left = packets1[i]
		const right = packets2[i]

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

		const packetsAreInOrder = areListsInOrder(
			Array.isArray(left) ? left : [left],
			Array.isArray(right) ? right : [right],
		)

		if (packetsAreInOrder === undefined) {
			continue
		}

		return packetsAreInOrder
	}

	if (packets1.length === packets2.length) {
		// `undefined` means to keep iterating and checking.
		return undefined
	}

	return true
}
