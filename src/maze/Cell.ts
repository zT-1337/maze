export class Cell {
  isVisited: boolean;
  hasTopWall: boolean;
  hasRightWall: boolean;
  hasBottomWall: boolean;
  hasLeftWall: boolean;
  position: number;
  hasPlayer: boolean;

  constructor (position: number) {
    this.isVisited = false
    this.hasTopWall = true
    this.hasRightWall = true
    this.hasBottomWall = true
    this.hasLeftWall = true
    this.hasPlayer = false
    this.position = position
  }
}
