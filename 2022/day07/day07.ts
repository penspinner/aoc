import * as path from 'path'
import { sum } from 'utils'

export const part1 = (input: string) => {
	const dirSizeByDirname = getDirSizeByDirname(input)
	const dirnames = Object.keys(dirSizeByDirname)
	let sumOfDirsWithDirSizeUnder100000 = 0
	const getSumAllDirsStartingWith = (dirnameStartingWith: string) =>
		dirnames.reduce((total, dirname) => {
			if (dirname.startsWith(dirnameStartingWith)) {
				return total + dirSizeByDirname[dirname]
			}

			return total
		}, 0)
	Object.entries(dirSizeByDirname).forEach(([dir, dirSize]) => {
		if (dirSize > 100000) {
			return
		}

		const sumAllDirsStartingWith = getSumAllDirsStartingWith(dir)

		if (sumAllDirsStartingWith > 100000) {
			return
		}

		sumOfDirsWithDirSizeUnder100000 += sumAllDirsStartingWith
	})
	return sumOfDirsWithDirSizeUnder100000
}

export const part2 = (input: string) => {
	const dirSizeByDirname = getDirSizeByDirname(input)
	const dirSizes = Object.values(dirSizeByDirname)
	const totalDirSize = sum(dirSizes)
	const unusedSpace = 70000000 - totalDirSize
	let smallestDirSizeToReachUnusedSpace: number | undefined = undefined
	const dirnames = Object.keys(dirSizeByDirname)
	const getSumAllDirsStartingWith = (dirnameStartingWith: string) =>
		dirnames.reduce((total, dirname) => {
			if (dirname.startsWith(dirnameStartingWith)) {
				return total + dirSizeByDirname[dirname]
			}

			return total
		}, 0)
	Object.keys(dirSizeByDirname).forEach((dirname) => {
		const sumAllDirsStartingWith = getSumAllDirsStartingWith(dirname)
		const unusedSpaceAfterDeletingDir = unusedSpace + sumAllDirsStartingWith
		if (unusedSpaceAfterDeletingDir >= 30000000) {
			if (
				smallestDirSizeToReachUnusedSpace === undefined ||
				smallestDirSizeToReachUnusedSpace > sumAllDirsStartingWith
			) {
				smallestDirSizeToReachUnusedSpace = sumAllDirsStartingWith
			}
		}
	})

	if (smallestDirSizeToReachUnusedSpace === undefined) {
		throw new Error('Unable to find a dir to delete that opens up space for 30,000,000.')
	}

	return smallestDirSizeToReachUnusedSpace
}

/**
 * Takes the input and returns a flat object of directory sizes keyed by the directory names.
 * E.g. { '/': 1000, '/a': 123, '/a/b': 444, '/e': 2222 }
 */
const getDirSizeByDirname = (input: string) => {
	const lines = input.split('\n')
	const dirSizeByDirname: Record<string, number> = {}
	let currentDirname = ''
	lines.forEach((line) => {
		const [first, ...rest] = line.split(' ')

		if (first === '$') {
			const [command, arg] = rest

			if (command === 'cd') {
				currentDirname = path.join(currentDirname, arg)
			}
		} else if (first === 'dir') {
			const [dirname] = rest
			const nestedDirname = path.join(currentDirname, dirname)

			if (dirSizeByDirname[nestedDirname] === undefined) {
				dirSizeByDirname[nestedDirname] = 0
			}
		} else if (Number.isFinite(+first)) {
			if (typeof dirSizeByDirname[currentDirname] === 'number') {
				dirSizeByDirname[currentDirname] += +first
			} else {
				dirSizeByDirname[currentDirname] = +first
			}
		}
	})
	return dirSizeByDirname
}
