export class Cell {
  isVisited: boolean;
  isAddedNeighbour: boolean;
  hasTopWall: boolean;
  hasRightWall: boolean;
  hasBottomWall: boolean;
  hasLeftWall: boolean;
  position: number;
  hasPlayer: boolean;

  visualizationModeColor: string | undefined;
  visualizationModeText: string | undefined;

  constructor (position: number) {
    this.isVisited = false
    this.isAddedNeighbour = false
    this.hasTopWall = true
    this.hasRightWall = true
    this.hasBottomWall = true
    this.hasLeftWall = true
    this.hasPlayer = false
    this.position = position
  }

  public reset () {
    this.isVisited = false
    this.isAddedNeighbour = false
    this.hasTopWall = true
    this.hasRightWall = true
    this.hasBottomWall = true
    this.hasLeftWall = true
    this.hasPlayer = false

    this.visualizationModeColor = undefined
    this.visualizationModeText = undefined
  }
}
