import md5 from 'md5'
import store from '../../lib/lobby-store'
import gameStore from '../../lib/game-server-store'
import config from '../../lib/config'
import {InitializeGame} from 'boardgame.io/internal'
import game from '../../lib/game'

const nonExistentRoomStatus = 'non-existent'
const initialRoomStatus = 'lobby'
const runningStatus = 'running'

const addPlayer = async (gameID, playerName) => {
  const gameState = await store.get(gameID) || {
    status: initialRoomStatus
  }
  const players = gameState.players || {}
  players[playerName] = {
    id: Object.keys(players).length.toString(),
    name: playerName,
  }
  await store.set(gameID, {players, status: gameState.status})
}

function validateCanStart(gameState) {
  if (gameState.status !== initialRoomStatus) {
    gameState.validationMessage = `Status is not ${initialRoomStatus}: ${gameState.status}`
    return false
  }
  const players = gameState.players || {}
  const numOfPlayers = Object.keys(players).length
  if (numOfPlayers < 4 || numOfPlayers % 2 !== 0) {
    gameState.validationMessage = `Number of players must be an even number greater or equal than 4: ${numOfPlayers}`
    return false
  }
  return true
}

function getNumberOfNamesToFill(inputValue) {
  let result = inputValue
  const defaultValue = config.defaultNumberOfNamesToFill
  if (!result) {
    return defaultValue
  }
  try {
    result = parseInt(result)
    if (isNaN(result)) {
      console.warn(`input value is not an integer: ${result}`)
      return defaultValue
    }
  } catch (err) {
    console.warn('While parsing number of names to fill', err)
    return defaultValue
  }
  if (result <= 0) {
    console.warn(`number of names to fill must be a positive number: ${result}`)
    return defaultValue
  }
  return result
}

const startHandler = async ({gameID, numberOfNamesToFill}) => {
  const gameState = await getHandler({gameID})
  if (!validateCanStart(gameState)) {
    return gameState
  }

  gameState.setupData = {
    numberOfNamesToFill: getNumberOfNamesToFill(numberOfNamesToFill)
  }
  gameState.status = runningStatus
  await gameStore.setMetadata(gameID, gameState)
  await gameStore.setState(gameID, InitializeGame({
    game,
    numPlayers: Object.keys(gameState.players).length,
    setupData: gameState.setupData
  }))
  await store.set(gameID, gameState)

  return gameState
}

const getHandler = async ({gameID}) => {
  return await store.get(gameID) || {
    status: nonExistentRoomStatus
  }
}

const joinHandler = async ({gameID, playerName}) => {
  await addPlayer(gameID, playerName)
  return await getHandler({gameID})
}

const handlers = {
  get: getHandler,
  join: joinHandler,
  start: startHandler,
}

export default async (req, res) => {
  const body = req.body
  if (body.gameID) {
    body.gameID = body.gameID.toLowerCase()
  }
  const type = body.type
  const result = await handlers[type](body)
  result['hash'] = md5(JSON.stringify(result))
  res.status(200).json(result)
}