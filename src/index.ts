import { Maze } from './maze/maze'
import { start } from './ui/terminal'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

start(maze)
