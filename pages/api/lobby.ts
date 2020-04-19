import md5 from 'md5'
import store from '../../lib/lobby-store'

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

const startHandler = async ({gameID}) => {
  const gameState = await getHandler({gameID})
  if (gameState.status === nonExistentRoomStatus) {
    return gameState
  }
  gameState.status = runningStatus
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
  const type = body.type
  const result = await handlers[type](body)
  result['hash'] = md5(JSON.stringify(result))
  res.status(200).json(result)
}