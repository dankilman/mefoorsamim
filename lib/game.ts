import {ActivePlayers, TurnOrder} from 'boardgame.io/core'
import {Ctx, Game} from 'boardgame.io'

const countdownSeconds = 30
const countdown = countdownSeconds * 1000
const numNamesPerPlayer = 20

type StartPhase = 'naming' | 'playing' | 'pairing'
const startPhase: StartPhase = 'pairing' as StartPhase


interface State {
  pairs?: any
  order?: any
  players?: any
  names: string[]
  numNamesPerPlayer: number
  currentName?: string
  pairGuesses: object
  hasLastGuessForUndo: boolean
  currentTurnGuesses: number
  summary?: object
  countdownEnd?: number
  countdownLeft?: number
}

function pauseTimer(G: State, ctx: Ctx) {
  if (G.countdownEnd) {
    G.countdownLeft = G.countdownEnd - Date.now()
    G.countdownEnd = null
  }
}

function resumeTimer(G: State, ctx: Ctx) {
  if (G.countdownLeft) {
    G.countdownEnd = Date.now() + G.countdownLeft
    G.countdownLeft = null
  }
}

function getPairGuesses(G: State, ctx: Ctx) {
  const currentPlayer = G.players[ctx.currentPlayer]
  return G.pairGuesses[currentPlayer.pairIndex] || []
}

function addGuessToPair(G: State, ctx: Ctx) {
  const currentPlayer = G.players[ctx.currentPlayer]
  const currentPairIndex = currentPlayer.pairIndex
  const currentPairGuesses = G.pairGuesses[currentPairIndex] || []
  currentPairGuesses.push(G.currentName)
  G.currentTurnGuesses++
  G.hasLastGuessForUndo = true
  G.currentName = undefined
  G.pairGuesses[currentPairIndex] = currentPairGuesses
}

function undoAddGuessToPair(G: State, ctx: Ctx) {
  G.hasLastGuessForUndo = false
  G.currentTurnGuesses--
  G.currentName = getPairGuesses(G, ctx).pop()
}

function restoreName(G: State) {
  G.names.push(G.currentName)
  G.currentName = undefined
}

function popName(G: State) {
  if (G.names.length > 0) {
    G.currentName = G.names.pop()
  }
}

const GameObject: Game<State> = {

  name: 'mefoorsamim',

  setup: (ctx, setupData): State => {
    return {
      names: [],
      numNamesPerPlayer,
      pairGuesses: {},
      hasLastGuessForUndo: false,
      currentTurnGuesses: 0
    }
  },

  onEnd: (G, ctx) => {
    const summaryGuesses = []
    for (const [index, guesses] of Object.entries(G.pairGuesses)) {
      const pairPlayerIDs = G.pairs[index]
      const player1Name = G.players[pairPlayerIDs[0]].name
      const player2Name = G.players[pairPlayerIDs[1]].name
      const numberOfGuesses = guesses.length
      summaryGuesses.push({
        guesses,
        numberOfGuesses,
        player1Name,
        player2Name,
      })
    }
    summaryGuesses.sort((a, b) => b.numberOfGuesses - a.numberOfGuesses)
    G.summary = {
      guesses: summaryGuesses,
    }
  },

  phases: {

    pairing: {
      start: startPhase === 'pairing',
      next: 'naming',
      endIf: (G, ctx) => !!G.pairs,
      onEnd: (G, ctx) => {
        const order = []
        const players = {}
        const pairs = []
        for (const pair of G.pairs) {
          order.push(pair.player1.id)
          pairs.push([pair.player1.id, pair.player2.id])
          for (const player of [pair.player1, pair.player2]) {
            players[player.id] = {
              pairColor: pair.color,
              pairIndex: pair.index,
              ...player
            }
          }
        }
        for (const pair of G.pairs) {
          order.push(pair.player2.id)
        }
        G.pairs = pairs
        G.players = players
        G.order = order
      },
      moves: {
        choosePairs(G, ctx, pairs) {
          G.pairs = pairs
        },
      },
      turn: {
        moveLimit: 1,
        activePlayers: ActivePlayers.ALL,
      },
    },

    naming: {
      start: startPhase === 'naming',
      next: 'playing',
      endIf: (G, ctx) => G.names.length === ctx.numPlayers * G.numNamesPerPlayer,
      onEnd: (G, ctx) => {
        G.names = ctx.random.Shuffle(G.names)
      },
      moves: {
        chooseNames(G, ctx, names) {
          G.names.push(...names)
        },
      },
      turn: {
        activePlayers: ActivePlayers.ALL_ONCE,
      },
    },

    playing: {
      start: startPhase === 'playing',
      endIf: (G, ctx) => G.names.length === 0 && !G.currentName,
      onEnd: (G, ctx) => {
        ctx.events.endGame()
      },
      turn: {
        onBegin: (G, ctx) => {
          ctx.events.setActivePlayers({
            currentPlayer: 'starting',
            others: 'watching',
          })
          popName(G)
        },
        onEnd: (G, ctx) => {
          G.currentTurnGuesses = 0
          G.hasLastGuessForUndo = false
          G.countdownEnd = null
          G.countdownLeft = null
        },
        order: TurnOrder.CUSTOM_FROM('order'),
        stages: {
          watching: {
            moves: {pauseTimer, resumeTimer}
          },
          starting: {
            moves: {
              startTurn(G, ctx) {
                ctx.events.endStage()
                G.countdownEnd = Date.now() + countdown
              }
            },
            next: 'playing',
          },
          playing: {
            moves: {
              pauseTimer,
              resumeTimer,
              addCurrentNameAndGetNextName(G: State, ctx: Ctx) {
                addGuessToPair(G, ctx)
                popName(G)
              },
              undoLastGuess(G: State, ctx: Ctx) {
                if (!G.hasLastGuessForUndo) {
                  return
                }
                restoreName(G)
                undoAddGuessToPair(G, ctx)
              },
              endTimer(G, ctx) {
                pauseTimer(G, ctx)
                ctx.events.endStage()
              }
            },
            next: 'ending',
          },
          ending: {
            moves: {
              addLastAndEndTurn(G, ctx) {
                addGuessToPair(G, ctx)
                ctx.events.endTurn()
              },
              endTurn(G, ctx) {
                restoreName(G)
                ctx.events.endTurn()
              }
            },
          },
        }
      }
    },
  },

}

export default GameObject
export {countdownSeconds}
export type {State}
