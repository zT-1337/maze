import { Maze } from '../../../maze/maze'
import { initRenderOfMaze } from './maze.renderer'
import { initInputs } from './input'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

window.addEventListener('DOMContentLoaded', () => {
  initRenderOfMaze(maze)
  initInputs(maze)
})
