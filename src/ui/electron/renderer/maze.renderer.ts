import { Maze } from '../../../maze/maze'
import $ from 'jquery'
import { Cell } from '../../../maze/cell'
import { VisualMaze } from '../../../maze/visual.maze'

const cellRenderWidthInPx = 32
const cellRenderHeightInPx = 32

export function renderMaze (maze: Maze) {
  renderCells(maze.cells, maze.width, maze.height)
}

export function renderCells (cells: Cell[], width: number, height: number) {
  const mazeContainer = $('#maze')
  mazeContainer.empty()
  mazeContainer.css('grid-template-columns', `repeat(${width}, auto)`)
  mazeContainer.css('width', `${width * cellRenderWidthInPx}px`)
  mazeContainer.css('height', `${height * cellRenderHeightInPx}px`)

  for (const cell of cells) {
    const cellElement = $('<div/>')
    cellElement.prop('id', `cell-${cell.position}`)
    cellElement.css('width', `${cellRenderWidthInPx}px`)
    cellElement.css('height', `${cellRenderHeightInPx}px`)
    cellElement.addClass('cell')

    mazeContainer.append(cellElement)

    renderCell(cell)
  }
}

export function renderCell (cell: Cell) {
  const cellElement = $(`#cell-${cell.position}`)
  cellElement.empty()
  const isVisualModeOn = $('input[name="visualModeCheckbox"]').prop('checked')

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

  if (cell.hasPlayer && !isVisualModeOn) {
    addPlayer(cellElement)
  }

  if (isVisualModeOn) {
    addVisualMode(cellElement, cell.visualizationModeColor, cell.visualizationModeText)
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

// eslint-disable-next-line no-undef
function addVisualMode (cellElement: JQuery<HTMLElement>, color: string | undefined, text: string | undefined) {
  const visualMode = $('<div/>')
  const visualModeText = $('<div/>')

  if (color !== undefined) {
    visualMode.css('backgroundColor', color)
  }

  if (text !== undefined) {
    visualModeText.text(text)
  }

  visualMode.addClass('visualMode')
  visualMode.css('width', `${cellRenderWidthInPx}px`)
  visualMode.css('height', `${cellRenderHeightInPx}px`)

  visualModeText.addClass('visualMode')
  visualModeText.addClass('visualModeText')
  visualModeText.css('width', `${cellRenderWidthInPx}px`)
  visualModeText.css('height', `${cellRenderHeightInPx}px`)

  cellElement.append(visualMode)
  cellElement.append(visualModeText)
}

export function initVisualMode (maze: Maze, visualMaze: VisualMaze) {
  $('input[name="visualModeCheckbox"]').on('change', function () {
    if ((this as HTMLInputElement).checked) {
      visualMaze.reset()
      renderCells(visualMaze.current(), visualMaze.width, visualMaze.height)
    } else {
      renderMaze(maze)
    }
  })
}
