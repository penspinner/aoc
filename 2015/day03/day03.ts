export const part1 = (input: string) => {
	const deliveredByCoordinate: Record<`${number},${number}`, boolean> = { '0,0': true }
	const santaCoordinate = { x: 0, y: 0 }

	for (let i = 0; i < input.length; i++) {
		const direction = input[i]

		if (direction === '>') {
			santaCoordinate.x++
		} else if (direction === '<') {
			santaCoordinate.x--
		} else if (direction === 'v') {
			santaCoordinate.y++
		} else if (direction === '^') {
			santaCoordinate.y--
		}

		deliveredByCoordinate[`${santaCoordinate.x},${santaCoordinate.y}`] = true
	}

	return Object.keys(deliveredByCoordinate).length
}

export const part2 = (input: string) => {
	const deliveredByCoordinate: Record<`${number},${number}`, boolean> = { '0,0': true }
	const santaCoordinate = { x: 0, y: 0 }
	const roboSantaCoordinate = { x: 0, y: 0 }

	for (let i = 0; i < input.length; i++) {
		const currentCoordinate = i % 2 === 0 ? santaCoordinate : roboSantaCoordinate
		const direction = input[i]

		if (direction === '>') {
			currentCoordinate.x++
		} else if (direction === '<') {
			currentCoordinate.x--
		} else if (direction === 'v') {
			currentCoordinate.y++
		} else if (direction === '^') {
			currentCoordinate.y--
		}

		deliveredByCoordinate[`${currentCoordinate.x},${currentCoordinate.y}`] = true
	}

	return Object.keys(deliveredByCoordinate).length
}
