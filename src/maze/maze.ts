import { getRandomElementAndRemoveIt, getRandomInt } from '../util/Random'
import { Cell } from './cell'
import { VisualMaze } from './visual.maze'

export class Maze {
  width: number;
  height: number;
  cells: Cell[];
  playerPosition: number;

  constructor (width: number, height: number) {
    this.width = width
    this.height = height
    this.playerPosition = 0
    this.cells = new Array<Cell>(this.width * this.height)

    for (let i = 0; i < this.width * this.height; ++i) {
      this.cells[i] = new Cell(i)
    }

    this.cells[this.playerPosition].hasPlayer = true
  }

  private resetMaze () {
    for (const cell of this.cells) {
      cell.reset()
    }

    this.playerPosition = 0
    this.cells[this.playerPosition].hasPlayer = true
  }

  public generateMazeWithRandomPrim (): VisualMaze {
    this.resetMaze()

    const previousStates: Cell[][] = []
    const notVisitedCells = [this.cells[Math.floor((this.width * this.height) / 2 - this.width / 2)]]
    notVisitedCells[0].visualizationModeColor = 'blue'
    previousStates.push(this.copyCells())

    while (notVisitedCells.length > 0) {
      const currentCell = getRandomElementAndRemoveIt(notVisitedCells)
      currentCell.isVisited = true
      currentCell.visualizationModeColor = 'yellow'

      for (const cell of this.getNeighboursByVisited(currentCell.position, false)) {
        if (cell.isAddedNeighbour) continue

        cell.isAddedNeighbour = true
        cell.visualizationModeColor = 'blue'
        notVisitedCells.push(cell)
      }

      previousStates.push(this.copyCells())

      const neighbours = this.getNeighboursByVisited(currentCell.position, true)
      if (neighbours.length === 0) continue

      const randomNeighbour = neighbours[getRandomInt(0, neighbours.length)]
      randomNeighbour.visualizationModeColor = 'orange'
      this.connect(currentCell, randomNeighbour)
      previousStates.push(this.copyCells())
      randomNeighbour.visualizationModeColor = undefined
      currentCell.visualizationModeColor = undefined
      previousStates.push(this.copyCells())
    }

    return new VisualMaze(previousStates, this.width, this.height)
  }

  private copyCells (): Cell[] {
    return this.cells.map(cell => Object.assign(new Cell(cell.position), cell))
  }

  public generateMazeWithRandomDepthFirst (): void {
    this.resetMaze()
    const backtrackingCells = [this.cells[Math.floor((this.width * this.height) / 2)]]

    while (backtrackingCells.length > 0) {
      const currentCell = backtrackingCells[backtrackingCells.length - 1]
      currentCell.isVisited = true

      const notVisitedNeighbours = this.getNeighboursByVisited(currentCell.position, false)

      if (notVisitedNeighbours.length === 0) {
        backtrackingCells.pop()
        continue
      }

      const randomNotVisitedNeighbour = notVisitedNeighbours[getRandomInt(0, notVisitedNeighbours.length)]
      backtrackingCells.push(randomNotVisitedNeighbour)
      this.connect(currentCell, randomNotVisitedNeighbour)
    }
  }

  private getNeighboursByVisited (currentPosition: number, visited: boolean): Cell[] {
    const neighbours: Cell[] = []

    const topNeighbourPosition = currentPosition - this.width
    if (this.hasTopNeighbour(currentPosition) && this.cells[topNeighbourPosition].isVisited === visited) {
      neighbours.push(this.cells[topNeighbourPosition])
    }

    const bottomNeighbourPosition = currentPosition + this.width
    if (this.hasBottomNeighbour(currentPosition) && this.cells[bottomNeighbourPosition].isVisited === visited) {
      neighbours.push(this.cells[bottomNeighbourPosition])
    }

    const leftNeighbourPosition = currentPosition - 1
    if (this.hasLeftNeighbour(currentPosition) && this.cells[leftNeighbourPosition].isVisited === visited) {
      neighbours.push(this.cells[leftNeighbourPosition])
    }

    const rightNeighbourPosition = currentPosition + 1
    if (this.hasRightNeighbour(currentPosition) && this.cells[rightNeighbourPosition].isVisited === visited) {
      neighbours.push(this.cells[rightNeighbourPosition])
    }

    return neighbours
  }

  private hasTopNeighbour (currentPosition: number): boolean {
    return currentPosition > this.width - 1
  }

  private hasBottomNeighbour (currentPosition: number): boolean {
    return currentPosition < this.width * (this.height - 1)
  }

  private hasLeftNeighbour (currentPosition: number): boolean {
    return currentPosition % this.width !== 0
  }

  private hasRightNeighbour (currentPosition: number): boolean {
    return currentPosition % this.width !== this.width - 1
  }

  private connect (currentCell: Cell, neighbour: Cell): void {
    if (this.isNeighbourToTheLeftOfCurrentCell(currentCell, neighbour)) {
      currentCell.hasLeftWall = false
      neighbour.hasRightWall = false
    } else if (this.isNeighbourToTheRightOfCurrentCell(currentCell, neighbour)) {
      currentCell.hasRightWall = false
      neighbour.hasLeftWall = false
    } else if (this.isNeighbourToTheTopOfCurrentCell(currentCell, neighbour)) {
      currentCell.hasTopWall = false
      neighbour.hasBottomWall = false
    } else {
      currentCell.hasBottomWall = false
      neighbour.hasTopWall = false
    }
  }

  private isNeighbourToTheLeftOfCurrentCell (currentCell: Cell, neighbour: Cell): boolean {
    return currentCell.position - 1 === neighbour.position
  }

  private isNeighbourToTheRightOfCurrentCell (currentCell: Cell, neighbour: Cell): boolean {
    return currentCell.position + 1 === neighbour.position
  }

  private isNeighbourToTheTopOfCurrentCell (currentCell: Cell, neighbour: Cell): boolean {
    return currentCell.position - this.width === neighbour.position
  }

  public movePlayerLeft (): [boolean, number, number] {
    if (this.cells[this.playerPosition].hasLeftWall) return [false, -1, -1]

    return this.movePlayer(this.playerPosition - 1)
  }

  public movePlayerRight (): [boolean, number, number] {
    if (this.cells[this.playerPosition].hasRightWall) return [false, -1, -1]

    return this.movePlayer(this.playerPosition + 1)
  }

  public movePlayerUp (): [boolean, number, number] {
    if (this.cells[this.playerPosition].hasTopWall) return [false, -1, -1]

    return this.movePlayer(this.playerPosition - this.width)
  }

  public movePlayerDown (): [boolean, number, number] {
    if (this.cells[this.playerPosition].hasBottomWall) return [false, -1, -1]

    return this.movePlayer(this.playerPosition + this.width)
  }

  private movePlayer (newPosition: number): [boolean, number, number] {
    const oldPosition = this.playerPosition
    this.playerPosition = newPosition
    this.cells[oldPosition].hasPlayer = false
    this.cells[this.playerPosition].hasPlayer = true

    return [true, oldPosition, this.playerPosition]
  }

  public toString (): string {
    const renderWidth = this.width * 2 + 1
    const renderHeigth = this.height * 2 + 1
    const fields = new Array<string>(renderWidth * renderHeigth)

    for (let i = 0; i < renderWidth * renderHeigth; ++i) {
      fields[i] = '⬛'
      if (i % renderWidth === renderWidth - 1) {
        fields[i] += '\n'
      }
    }

    for (let i = 0; i < this.width * this.height; ++i) {
      const renderPosition = (Math.floor(i / this.width) * 2 + 1) * renderWidth + (i % this.width) * 2 + 1
      fields[renderPosition] = this.cells[i].hasPlayer ? '🟥' : '⬜'

      if (this.hasBottomNeighbour(i) && !this.cells[i].hasBottomWall) {
        fields[renderPosition + renderWidth] = '⬜'
      }

      if (this.hasRightNeighbour(i) && !this.cells[i].hasRightWall) {
        fields[renderPosition + 1] = '⬜'
      }
    }

    return fields.join('')
  }
}
