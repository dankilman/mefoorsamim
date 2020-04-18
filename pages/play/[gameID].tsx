import { useRouter } from 'next/router'
import Lobby from '../../components/lobby'

export default (props) => {
  const router = useRouter()
  const gameID = router.query.gameID
  const playerName = router.query.n
  if (!gameID) {
    return <div />
  }
  return (
    <Lobby gameID={gameID as string} queryPlayerName={playerName as string}/>
  )
}
