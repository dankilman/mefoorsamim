import { useRouter } from 'next/router'
import Lobby from '../../components/lobby'
import {Box} from 'rebass'
import Head from 'next/head'

export default (props) => {
  const router = useRouter()
  const gameID = router.query.gameID
  const playerName = router.query.n
  if (!gameID) {
    return <div />
  }
  return (
    <Box>
      <Head>
        <title>{gameID} | Mefoorsamim</title>
      </Head>
      <Lobby gameID={gameID as string} queryPlayerName={playerName as string}/>
    </Box>
  )
}
