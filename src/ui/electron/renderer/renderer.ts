import { Maze } from '../../../maze/maze'
import { initVisualMode, renderMaze } from './maze.renderer'
import { initInputs } from './input'

const maze = new Maze(32, 16)
const visualMaze = maze.generateMazeWithRandomPrim()

window.addEventListener('DOMContentLoaded', () => {
  renderMaze(maze)
  initInputs(maze, visualMaze)
  initVisualMode(maze, visualMaze)
})
