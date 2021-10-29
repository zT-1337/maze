import { Maze } from '../../../maze/maze'
import $ from 'jquery'
import { renderCell } from './maze.renderer'

export function initInputs (maze: Maze) {
  $(document).on('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp': {
        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerUp()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      } case 'ArrowDown': {
        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerDown()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      } case 'ArrowLeft': {
        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerLeft()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      } case 'ArrowRight': {
        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerRight()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      }
    }
  })
}

function handleMovePlayer (maze: Maze, isSuccessfull: boolean, oldPosition: number, newPosition: number) {
  if (!isSuccessfull) return

  renderCell(maze, oldPosition)
  renderCell(maze, newPosition)
}
