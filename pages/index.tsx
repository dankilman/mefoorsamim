import {Button, Flex, Heading} from 'rebass'
import {Input} from '@rebass/forms'
import {Router, useRouter} from 'next/router'
import {useState} from 'react'
import Head from 'next/head'

export default () => {
  const [roomName, setRoomName] = useState('')
  const router = useRouter()

  const goToRoom = () => roomName.trim() && router.push(`/play/${roomName.trim()}`)

  return (
    <Flex
      flexWrap="wrap"
      width={500}
      maxWidth="100vw"
      p={10}
      bg="rgba(255, 255, 255, 0.85)"
      justifyContent="center"
      m="auto"
      sx={{borderRadius: '0 0 4px 4px'}}
    >
      <Head>
        <title>Mefoorsamim</title>
      </Head>
      <Heading width={1} mb={1}>Mefoorsamim</Heading>
      <Flex width={1} mt={2}>
        <Input
          flex={5}
          mr={1}
          placeholder="Enter Room Name"
          value={roomName}
          onInput={e => setRoomName((e.target as any).value)}
          onChange={e => setRoomName((e.target as any).value)}
          onKeyPress={e => e.key === 'Enter' && goToRoom()}
        />
        <Button
          flex={1}
          onClick={() => goToRoom() }
          bg="c5"
        >
          Play
        </Button>
      </Flex>
    </Flex>
  )
}
