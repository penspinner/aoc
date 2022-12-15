export const part1 = (input: string, row: number) => {
	const [sensorToBeaconPairs, arrangement] = parse(input)
	const pairsIntersectingRow: { x1: number; x2: number }[] = []
	sensorToBeaconPairs.forEach(({ sensor, beacon }) => {
		const dx = Math.abs(beacon.x - sensor.x)
		const dy = Math.abs(beacon.y - sensor.y)
		const distance = dx + dy

		if (
			(sensor.y < row && sensor.y + distance >= row) ||
			(sensor.y > row && sensor.y - distance <= row)
		) {
			const distanceFromRow = Math.abs(row - sensor.y)
			const numHashes = 2 * distance - 2 * distanceFromRow
			const halfway = Math.floor(numHashes / 2)
			pairsIntersectingRow.push({ x1: sensor.x - halfway, x2: sensor.x + halfway })
		}

		// for (let i = 1; i <= distance; i++) {
		// 	// Draw all # that are 'i' units away
		// 	for (let x = i, y = 0; x >= 0; x--, y++) {
		// 		arrangement[`${sensor.x + x},${sensor.y + y}`] ??= '#'
		// 		arrangement[`${sensor.x + x},${sensor.y - y}`] ??= '#'
		// 		arrangement[`${sensor.x - x},${sensor.y + y}`] ??= '#'
		// 		arrangement[`${sensor.x - x},${sensor.y - y}`] ??= '#'
		// 	}
		// }
	})
	pairsIntersectingRow.sort((a, b) => a.x1 - b.x1)
	let total = 0
	const pairsUsed: { x1: number; x2: number }[] = []
	const beaconsOnRow = Object.entries(arrangement).reduce<string[]>(
		(beacons, [coordinate, value]) => {
			if (coordinate.endsWith(`,${row}`) && value === 'B') {
				beacons.push(coordinate)
			}

			return beacons
		},
		[],
	)
	const getBeaconsInBetween = (x1: number, x2: number) => {
		let beaconesInBetween = 0
		beaconsOnRow.forEach((beacon) => {
			const [beaconX1, beaconX2] = beacon.split(',').map(Number)
			if (x1 <= beaconX1 && x2 >= beaconX2) {
				beaconesInBetween++

				beaconsOnRow.shift()
			}
		})
		return beaconesInBetween
	}
	outerloop: for (let i = 0; i < pairsIntersectingRow.length; i++) {
		const pair = pairsIntersectingRow[i]
		let newX1 = pair.x1

		for (const pairUsed of pairsUsed) {
			if (pair.x1 >= pairUsed.x1 && pair.x2 <= pairUsed.x2) {
				continue outerloop
			}

			if (newX1 < pairUsed.x2) {
				newX1 = pairUsed.x2
			}
		}

		const num = pair.x2 - newX1 - getBeaconsInBetween(newX1, pair.x2)
		total += num
		pairsUsed.push(pair)
	}
	return total + 1
}

export const part2 = (input: string) => {
	const [sensorToBeaconPairs, arrangement] = parse(input)
	const bounds: { x1: number; y1: number; x2: number; y2: number } = {
		x1: Infinity,
		y1: 0,
		x2: -Infinity,
		y2: -Infinity,
	}
	sensorToBeaconPairs.forEach(({ sensor }) => {
		if (sensor.x < bounds.x1) {
			bounds.x1 = sensor.x
		}

		if (sensor.x > bounds.x2) {
			bounds.x2 = sensor.x
		}

		if (sensor.y < bounds.y1) {
			bounds.y1 = sensor.y
		}

		if (sensor.y > bounds.y2) {
			bounds.y2 = sensor.y
		}
	})
	console.log(bounds)
}

const parse = (input: string) => {
	const lines = input.split('\n')
	const arrangement: Record<`${number},${number}`, string> = {}
	const sensorToBeaconPairs: {
		sensor: { x: number; y: number }
		beacon: { x: number; y: number }
	}[] = []
	lines.forEach((line) => {
		const [left, right] = line.split(': ')
		const [sensorX, sensorY] = left
			.replace('Sensor at ', '')
			.split(', ')
			.map((coordinate) => +coordinate.split('=')[1])
		const [beaconX, beaconY] = right
			.replace('closest beacon is at ', '')
			.split(', ')
			.map((coordinate) => +coordinate.split('=')[1])
		arrangement[`${sensorX},${sensorY}`] = 'S'
		arrangement[`${beaconX},${beaconY}`] = 'B'
		sensorToBeaconPairs.push({
			sensor: { x: sensorX, y: sensorY },
			beacon: { x: beaconX, y: beaconY },
		})
	})
	return [sensorToBeaconPairs, arrangement] as const
}
