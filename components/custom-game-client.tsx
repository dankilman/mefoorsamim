import React from 'react'
import {Client as RawClient} from 'boardgame.io/client'
import {Heading} from 'rebass'

interface ClientProps {
  game?
  gameID?
  playerID?
  numPlayers?
  board?
  multiplayer?
  debug?
  gameMetadata?
}

export function Client(opts: ClientProps) {
  let { game, numPlayers, board, multiplayer, debug, gameMetadata} = opts


  return class WrappedBoard extends React.Component {
    client: RawClient
    unsubscribe: any

    constructor(props) {
      super(props)

      if (debug === undefined) {
        debug = props.debug
      }

      this.client = RawClient({
        game,
        debug,
        numPlayers,
        multiplayer,
        gameID: props.gameID,
        playerID: props.playerID,
        credentials: props.credentials,
        enhancer: undefined,
      })
    }

    componentDidMount() {
      this.unsubscribe = this.client.subscribe(() => this.forceUpdate())
      this.client.start()
    }

    componentWillUnmount() {
      this.client.stop()
      this.unsubscribe()
    }

    componentDidUpdate(prevProps) {
      const props: any = this.props
      if (props.gameID != prevProps.gameID) {
        this.client.updateGameID(props.gameID)
      }
      if (props.playerID != prevProps.playerID) {
        this.client.updatePlayerID(props.playerID)
      }
      if (props.credentials != prevProps.credentials) {
        this.client.updateCredentials(props.credentials)
      }
    }

    render() {
      const state = this.client.getState()
      if (state === null) {
        return <Heading>Loading Game...</Heading>
      }
      let _board = null
      if (board) {
        _board = React.createElement(board, {
          ...state,
          ...this.props,
          isMultiplayer: !!multiplayer,
          moves: this.client.moves,
          events: this.client.events,
          gameID: this.client.gameID,
          playerID: this.client.playerID,
          reset: this.client.reset,
          undo: this.client.undo,
          redo: this.client.redo,
          gameMetadata,
        })
      }
      return <div className="bgio-client">{_board}</div>
    }
  }
}
