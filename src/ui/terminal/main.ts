import { Maze } from '../../maze/maze'
import { start } from './terminal'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

start(maze)
