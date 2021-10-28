export function getRandomElementAndRemoveIt<T> (elements: T[]): T {
  const randomPosition = getRandomInt(0, elements.length)
  const randomElement = elements[randomPosition]
  elements.splice(randomPosition, 1)

  return randomElement
}

export function getRandomInt (min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
