import { Maze } from '../../../maze/maze'

const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()
console.log(maze.toString())
