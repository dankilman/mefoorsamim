import gameServerStore from '../../lib/game-server-store'
import lobbyStore from '../../lib/lobby-store'


const clearGameData = async ({gameID}) => {
  await gameServerStore.wipe(gameID)
  await lobbyStore.remove(gameID)
  return true
}

const handlers = {
  clearGameData,
}

export default async (req, res) => {
  const body = req.body
  const type = body.type
  const result = await handlers[type](body)
  res.status(200).json(result)
}
