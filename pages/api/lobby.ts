const state = {}

const nonExistentRoomStatus = 'non-existent'
const initialRoomStatus = 'lobby'
const runningStatus = 'running'

const addPlayer = (gameID, playerName) => {
  const gameState = state[gameID] || {
    status: initialRoomStatus
  }
  const players = gameState.players || {}
  players[playerName] = {
    id: Object.keys(players).length.toString(),
    name: playerName,
  }
  state[gameID] = {players, status: gameState.status}
}

const startHandler = ({gameID}) => {
  const gameState = getHandler({gameID})
  if (gameState.status === nonExistentRoomStatus) {
    return gameState
  }
  gameState.status = runningStatus
  return gameState
}

const getHandler = ({gameID}) => {
  return state[gameID] || {
    status: nonExistentRoomStatus
  }
}

const joinHandler = ({gameID, playerName}) => {
  addPlayer(gameID, playerName)
  return getHandler({gameID})
}

const handlers = {
  get: getHandler,
  join: joinHandler,
  start: startHandler,
}

export default (req, res) => {
  const body = req.body
  const type = body.type
  const result = handlers[type](body)
  res.status(200).json(result)
}