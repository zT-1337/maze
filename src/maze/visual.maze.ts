import { Cell } from './cell'

export class VisualMaze {
  states: Cell[][];
  width: number;
  height: number;
  private index: number;

  constructor (states: Cell[][], width: number, height: number) {
    this.states = states
    this.width = width
    this.height = height
    this.index = 0
  }

  public next (): boolean {
    if (this.index < this.states.length - 1) {
      this.index += 1
      return true
    }

    return false
  }

  public previous (): boolean {
    if (this.index > 0) {
      this.index -= 1
      return true
    }

    return false
  }

  public reset () {
    this.index = 0
  }

  public current (): Cell[] {
    return this.states[this.index]
  }
}
