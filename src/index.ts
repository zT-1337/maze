import { Maze } from './maze/Maze'
import terminal from 'terminal-kit'

const term = terminal.terminal
const maze = new Maze(32, 16)
maze.generateMazeWithRandomPrim()

term(maze.toString())

term.grabInput(true)

term.on('key', function (name: string) {
  switch (name) {
    case 'CTRL_C': {
      process.exit(0)
    }
    case 'UP': {
      if (maze.movePlayerUp()) {
        rerenderMaze(maze, term)
      }
      break
    }
    case 'DOWN': {
      if (maze.movePlayerDown()) {
        rerenderMaze(maze, term)
      }
      break
    }
    case 'LEFT': {
      if (maze.movePlayerLeft()) {
        rerenderMaze(maze, term)
      }
      break
    }
    case 'RIGHT': {
      if (maze.movePlayerRight()) {
        rerenderMaze(maze, term)
      }
      break
    }
  }
})

function rerenderMaze (maze: Maze, term: terminal.Terminal) {
  term.clear()
  term(maze.toString())
}
