import { Maze } from './maze/maze'
import { initApp } from './ui/electron/electron'
// import { start } from './ui/terminal'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

// start(maze)
initApp()
