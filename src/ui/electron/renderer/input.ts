import { Maze } from '../../../maze/maze'
import $ from 'jquery'
import { renderMaze, renderCell, renderCells } from './maze.renderer'
import { VisualMaze } from '../../../maze/visual.maze'

export function initInputs (maze: Maze, visualMaze: VisualMaze) {
  $(document).on('keydown', (event) => {
    const isVisualModeOn = $('input[name="visualModeCheckbox"]').prop('checked') as boolean

    switch (event.key) {
      case 'ArrowUp': {
        if (isVisualModeOn) break

        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerUp()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      } case 'ArrowDown': {
        if (isVisualModeOn) break

        const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerDown()
        handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
        break
      } case 'ArrowLeft': {
        if (!isVisualModeOn) {
          const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerLeft()
          handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
          break
        }

        if (visualMaze.previous()) {
          renderCells(visualMaze.current(), visualMaze.width, visualMaze.height)
        }

        break
      } case 'ArrowRight': {
        if (!isVisualModeOn) {
          const [isSuccessfull, oldPosition, newPosition] = maze.movePlayerRight()
          handleMovePlayer(maze, isSuccessfull, oldPosition, newPosition)
          break
        }

        if (visualMaze.next()) {
          renderCells(visualMaze.current(), visualMaze.width, visualMaze.height)
        }

        break
      } case 'r': {
        handleMazeRegeneration(maze, visualMaze)
      }
    }
  })
}

function handleMovePlayer (maze: Maze, isSuccessfull: boolean, oldPosition: number, newPosition: number) {
  if (!isSuccessfull) return

  renderCell(maze.cells[oldPosition])
  renderCell(maze.cells[newPosition])
}

function handleMazeRegeneration (maze: Maze, visualMaze: VisualMaze) {
  switch ($('input[name=algorithm]:checked').val()) {
    case 'prim': {
      Object.assign(visualMaze, maze.generateMazeWithRandomPrim())
      break
    } case 'depthfirst': {
      Object.assign(visualMaze, maze.generateMazeWithRandomDepthFirst())
      break
    }
  }

  if ($('input[name="visualModeCheckbox"]').prop('checked')) {
    renderCells(visualMaze.current(), visualMaze.width, visualMaze.height)
  } else {
    renderMaze(maze)
  }
}
