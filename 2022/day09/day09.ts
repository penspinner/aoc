export const part1 = (input: string) => {
	const lines = input.split('\n')
	const seenCoordinateByKnot = getSeenCoordinatesByKnot(lines, 2)
	return Object.keys(seenCoordinateByKnot[1]).length
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	const seenCoordinatesByKnot = getSeenCoordinatesByKnot(lines, 10)
	return Object.keys(seenCoordinatesByKnot[9]).length
}

const getSeenCoordinatesByKnot = (lines: string[], knotCount: number) => {
	const coordinateByKnot: Record<number, { x: number; y: number }> = {}
	const seenCoordinatesByKnot: Record<number, Record<`${number},${number}`, boolean>> = {}

	for (let i = 0; i < knotCount; i++) {
		coordinateByKnot[i] = { x: 0, y: 0 }
		seenCoordinatesByKnot[i] = { '0,0': true }
	}

	for (const line of lines) {
		const [direction, stepStr] = line.split(' ')
		const step = +stepStr

		for (let i = 0; i < step; i++) {
			const headCoordinate = coordinateByKnot[0]

			if (direction === 'D') {
				headCoordinate.y++
			} else if (direction === 'U') {
				headCoordinate.y--
			} else if (direction === 'R') {
				headCoordinate.x++
			} else if (direction === 'L') {
				headCoordinate.x--
			}

			seenCoordinatesByKnot[0][`${headCoordinate.x},${headCoordinate.y}`] = true

			for (let j = 1; j < knotCount; j++) {
				const prevCoordinate = coordinateByKnot[j - 1]
				const coordinate = coordinateByKnot[j]
				const diffX = prevCoordinate.x - coordinate.x
				const diffY = prevCoordinate.y - coordinate.y

				if (Math.abs(diffY) < 2 && Math.abs(diffX) < 2) {
					// Break out of this loop because if the prev coordinate is not at least 2 points away,
					// then the rest of the tail also does not need to move.
					break
				}

				coordinate.x += Math.sign(diffX)
				coordinate.y += Math.sign(diffY)
				seenCoordinatesByKnot[j][`${coordinate.x},${coordinate.y}`] = true
			}
		}
	}

	return seenCoordinatesByKnot
}
