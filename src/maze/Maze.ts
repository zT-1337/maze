import { getRandomElementAndRemoveIt, getRandomInt } from '../util/Random'
import { Cell } from './Cell'

export class Maze {
  width: number;
  height: number;
  cells: Cell[];
  playerPosition: number;

  constructor (width: number, height: number) {
    this.width = width
    this.height = height
    this.playerPosition = 0
    this.cells = new Array<Cell>(width * height)

    for (let i = 0; i < width * height; ++i) {
      this.cells[i] = new Cell(i)
    }

    this.cells[this.playerPosition].hasPlayer = true
  }

  public generateMazeWithRandomPrim (): void {
    const notVisitedCells = [this.cells[Math.floor((this.width * this.height) / 2)]]

    while (notVisitedCells.length > 0) {
      const currentCell = getRandomElementAndRemoveIt(notVisitedCells)
      currentCell.isVisited = true

      for (const cell of this.getNeighboursByVisited(currentCell.position, false)) {
        notVisitedCells.push(cell)
      }

      const neighbours = this.getNeighboursByVisited(currentCell.position, true)
      if (neighbours.length === 0) continue

      const randomNeighbour = neighbours[getRandomInt(0, neighbours.length)]
      this.connect(currentCell, randomNeighbour)
    }
  }

  private getNeighbours (currentPosition: number): Cell[] {
    const neighbours: Cell[] = []

    if (this.hasTopNeighbour(currentPosition)) {
      neighbours.push(this.cells[currentPosition - this.width])
    }

    if (this.hasBottomNeighbour(currentPosition)) {
      neighbours.push(this.cells[currentPosition + this.width])
    }

    if (this.hasLeftNeighbour(currentPosition)) {
      neighbours.push(this.cells[currentPosition - 1])
    }

    if (this.hasRightNeighbour(currentPosition)) {
      neighbours.push(this.cells[currentPosition + 1])
    }

    return neighbours
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

  public movePlayerLeft (): boolean {
    if (this.cells[this.playerPosition].hasLeftWall) return false

    this.cells[this.playerPosition].hasPlayer = false
    this.cells[this.playerPosition - 1].hasPlayer = true
    this.playerPosition -= 1

    return true
  }

  public movePlayerRight (): boolean {
    if (this.cells[this.playerPosition].hasRightWall) return false

    this.cells[this.playerPosition].hasPlayer = false
    this.cells[this.playerPosition + 1].hasPlayer = true
    this.playerPosition += 1

    return true
  }

  public movePlayerUp (): boolean {
    if (this.cells[this.playerPosition].hasTopWall) return false

    this.cells[this.playerPosition].hasPlayer = false
    this.cells[this.playerPosition - this.width].hasPlayer = true
    this.playerPosition -= this.width

    return true
  }

  public movePlayerDown (): boolean {
    if (this.cells[this.playerPosition].hasBottomWall) return false

    this.cells[this.playerPosition].hasPlayer = false
    this.cells[this.playerPosition + this.width].hasPlayer = true
    this.playerPosition += this.width

    return true
  }
}
