import { Maze } from '../../../maze/maze'
import $ from 'jquery'

const cellRenderWidthInPx = 32
const cellRenderHeightInPx = 32

export function initRenderOfMaze (maze: Maze) {
  const mazeContainer = $('#maze')
  mazeContainer.empty()
  mazeContainer.css('grid-template-columns', `repeat(${maze.width}, auto)`)
  mazeContainer.css('width', `${maze.width * cellRenderWidthInPx}px`)
  mazeContainer.css('height', `${maze.height * cellRenderHeightInPx}px`)

  for (const cell of maze.cells) {
    const cellElement = $('<div/>')
    cellElement.prop('id', `cell-${cell.position}`)
    cellElement.css('width', `${cellRenderWidthInPx}px`)
    cellElement.css('height', `${cellRenderHeightInPx}px`)
    cellElement.addClass('cell')

    mazeContainer.append(cellElement)

    renderCell(maze, cell.position)
  }
}

export function renderCell (maze: Maze, position: number) {
  const cell = maze.cells[position]
  const cellElement = $(`#cell-${position}`)
  cellElement.empty()

  if (!cell.hasTopWall) {
    addTopPath(cellElement)
  }

  if (!cell.hasBottomWall) {
    addBottomPath(cellElement)
  }

  if (!cell.hasLeftWall) {
    addLeftPath(cellElement)
  }

  if (!cell.hasRightWall) {
    addRightPath(cellElement)
  }

  if (cell.hasPlayer) {
    addPlayer(cellElement)
  }
}

// eslint-disable-next-line no-undef
function addRightPath (cellElement: JQuery<HTMLElement>) {
  const rightPath = $('<div/>')
  rightPath.addClass('path')
  rightPath.css('right', '0')
  rightPath.css('top', `${cellRenderWidthInPx / 4}px`)
  rightPath.css('width', `${cellRenderWidthInPx - cellRenderWidthInPx / 4}px`)
  rightPath.css('height', `${cellRenderHeightInPx / 2}px`)
  cellElement.append(rightPath)
}

// eslint-disable-next-line no-undef
function addLeftPath (cellElement: JQuery<HTMLElement>) {
  const leftPath = $('<div/>')
  leftPath.addClass('path')
  leftPath.css('left', '0')
  leftPath.css('top', `${cellRenderWidthInPx / 4}px`)
  leftPath.css('width', `${cellRenderWidthInPx - cellRenderWidthInPx / 4}px`)
  leftPath.css('height', `${cellRenderHeightInPx / 2}px`)
  cellElement.append(leftPath)
}

// eslint-disable-next-line no-undef
function addTopPath (cellElement: JQuery<HTMLElement>) {
  const topPath = $('<div/>')
  topPath.addClass('path')
  topPath.css('top', '0')
  topPath.css('left', `${cellRenderWidthInPx / 4}px`)
  topPath.css('width', `${cellRenderWidthInPx / 2}px`)
  topPath.css('height', `${cellRenderHeightInPx - cellRenderWidthInPx / 4}px`)
  cellElement.append(topPath)
}

// eslint-disable-next-line no-undef
function addBottomPath (cellElement: JQuery<HTMLElement>) {
  const bottomPath = $('<div/>')
  bottomPath.addClass('path')
  bottomPath.css('bottom', '0')
  bottomPath.css('left', `${cellRenderWidthInPx / 4}px`)
  bottomPath.css('width', `${cellRenderWidthInPx / 2}px`)
  bottomPath.css('height', `${cellRenderHeightInPx - cellRenderWidthInPx / 4}px`)
  cellElement.append(bottomPath)
}

// eslint-disable-next-line no-undef
function addPlayer (cellElement: JQuery<HTMLElement>) {
  const player = $('<div/>')
  player.addClass('player')
  player.css('top', `${cellRenderWidthInPx / 4}px`)
  player.css('left', `${cellRenderHeightInPx / 4}px`)
  player.css('width', `${cellRenderWidthInPx / 2}px`)
  player.css('height', `${cellRenderHeightInPx / 2}px`)
  cellElement.append(player)
}
