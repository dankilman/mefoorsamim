import { useRouter } from 'next/router'
import Lobby from '../../components/lobby'
import {Box} from 'rebass'
import Head from 'next/head'

export default (props) => {
  const router = useRouter()
  let gameID = router.query.gameID
  const playerName = router.query.n
  if (!gameID) {
    return <div />
  }
  let finalGameID: string
  if (typeof gameID !== 'string') {
    gameID = gameID[0]
  }
  finalGameID = gameID.toLowerCase()
  return (
    <Box>
      <Head>
        <title>{finalGameID} | Mefoorsamim</title>
      </Head>
      <Lobby gameID={finalGameID} queryPlayerName={playerName as string}/>
    </Box>
  )
}
