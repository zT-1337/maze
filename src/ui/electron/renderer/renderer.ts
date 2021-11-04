import { Maze } from '../../../maze/maze'
import { renderMaze } from './maze.renderer'
import { initInputs } from './input'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

window.addEventListener('DOMContentLoaded', () => {
  renderMaze(maze)
  initInputs(maze)
})
