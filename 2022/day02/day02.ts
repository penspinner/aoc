const scoreForMove = {
	X: 1,
	Y: 2,
	Z: 3,
}

export const part1 = (input: string) => {
	const lines = input.split('\n')
	let totalScore = 0
	const outcomeScoreForMove = {
		A: {
			X: 3,
			Y: 6,
			Z: 0,
		},
		B: {
			X: 0,
			Y: 3,
			Z: 6,
		},
		C: {
			X: 6,
			Y: 0,
			Z: 3,
		},
	}

	for (const line of lines) {
		const [elfMove, myMove] = line.split(' ')
		const scoreForMyMove = scoreForMove[myMove as 'X' | 'Y' | 'Z']
		const outcomeScoreForMyMove =
			outcomeScoreForMove[elfMove as 'A' | 'B' | 'C'][myMove as 'X' | 'Y' | 'Z']
		totalScore += scoreForMyMove + outcomeScoreForMyMove
	}

	return totalScore
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	let totalScore = 0
	const outcomeScoreForMove = {
		X: 0,
		Y: 3,
		Z: 6,
	}
	const myMoveForElfMove = {
		A: {
			X: 'Z',
			Y: 'X',
			Z: 'Y',
		},
		B: {
			X: 'X',
			Y: 'Y',
			Z: 'Z',
		},
		C: {
			X: 'Y',
			Y: 'Z',
			Z: 'X',
		},
	}

	for (const line of lines) {
		const [elfMove, myMove] = line.split(' ')
		const myMoveBasedOnElfMove =
			myMoveForElfMove[elfMove as 'A' | 'B' | 'C'][myMove as 'X' | 'Y' | 'Z']
		const scoreForMyMove = scoreForMove[myMoveBasedOnElfMove as 'X' | 'Y' | 'Z']
		const outcomeScoreForMyMove = outcomeScoreForMove[myMove as 'X' | 'Y' | 'Z']
		totalScore += scoreForMyMove + outcomeScoreForMyMove
	}

	return totalScore
}
