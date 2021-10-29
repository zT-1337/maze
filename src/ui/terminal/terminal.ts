import { Maze } from '../../maze/maze'
import terminal from 'terminal-kit'

export function start (maze: Maze) {
  const term = terminal.terminal
  renderMaze(maze, term)
  setupInput(maze, term)
}

function setupInput (maze: Maze, term: terminal.Terminal) {
  term.grabInput(true)

  term.on('key', function (name: string) {
    switch (name) {
      case 'CTRL_C': {
        process.exit(0)
      }
      case 'UP': {
        if (maze.movePlayerUp()[0]) {
          renderMaze(maze, term)
        }
        break
      }
      case 'DOWN': {
        if (maze.movePlayerDown()[0]) {
          renderMaze(maze, term)
        }
        break
      }
      case 'LEFT': {
        if (maze.movePlayerLeft()[0]) {
          renderMaze(maze, term)
        }
        break
      }
      case 'RIGHT': {
        if (maze.movePlayerRight()[0]) {
          renderMaze(maze, term)
        }
        break
      }
    }
  })
}

function renderMaze (maze: Maze, term: terminal.Terminal) {
  term.clear()
  term(maze.toString())
}
