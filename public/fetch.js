const puzzle = document.querySelector('#puzzle')

const getPuzzle = async () => {
    const jsonPuzzle = await fetch('https://simple-origin-code.herokuapp.com/puzzle')
    const parsedPuzzle = await jsonPuzzle.json()
    console.log(parsedPuzzle.puzzle)
    puzzle.textContent = parsedPuzzle.puzzle
}

getPuzzle()

console.log('hi')