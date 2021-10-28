import { Maze } from './maze/Maze'

const maze = new Maze(16, 16)
maze.generateMazeWithRandomPrim()

console.log(maze)
