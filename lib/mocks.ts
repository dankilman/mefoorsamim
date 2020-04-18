import {State} from './game'

const initialNamingState: State = {
  'names': [],
  'numNamesPerPlayer': 20,
  'pairGuesses': {},
  'hasLastGuessForUndo': false,
  'currentTurnGuesses': 0,
  'pairs': [
    [
      '0',
      '1'
    ],
    [
      '2',
      '3'
    ],
    [
      '4',
      '5'
    ],
    [
      '6',
      '7'
    ]
  ],
  'players': {
    '0': {
      'pairColor': '#C4B7CB',
      'pairIndex': 0,
      'id': '0',
      'name': 'A'
    },
    '1': {
      'pairColor': '#C4B7CB',
      'pairIndex': 0,
      'id': '1',
      'name': 'B'
    },
    '2': {
      'pairColor': '#BBC7CE',
      'pairIndex': 1,
      'id': '2',
      'name': 'C'
    },
    '3': {
      'pairColor': '#BBC7CE',
      'pairIndex': 1,
      'id': '3',
      'name': 'D'
    },
    '4': {
      'pairColor': '#BFEDEF',
      'pairIndex': 2,
      'id': '4',
      'name': 'E'
    },
    '5': {
      'pairColor': '#BFEDEF',
      'pairIndex': 2,
      'id': '5',
      'name': 'F'
    },
    '6': {
      'pairColor': '#98E2C6',
      'pairIndex': 3,
      'id': '6',
      'name': 'H'
    },
    '7': {
      'pairColor': '#98E2C6',
      'pairIndex': 3,
      'id': '7',
      'name': 'I'
    }
  },
  'order': [
    '0',
    '2',
    '4',
    '6',
    '1',
    '3',
    '5',
    '7'
  ]
}

const initialStatePlaying = {
  'names': [
    'Dan Kilman',
    'Donald Duck',
    'The Mighty Warrior Of Then All',
    'אין שום סיכוי שזה יעבוד או שאולי כן?',
    // 'Dan Kilman',
    // 'Donald Duck',
    // 'The Mighty Warrior Of Then All',
    // 'אין שום סיכוי שזה יעבוד או שאולי כן?',
    // 'Dan Kilman',
    // 'Donald Duck',
    // 'The Mighty Warrior Of Then All',
    // 'אין שום סיכוי שזה יעבוד או שאולי כן?',
    // 'Dan Kilman',
    // 'Donald Duck',
    // 'The Mighty Warrior Of Then All',
    // 'אין שום סיכוי שזה יעבוד או שאולי כן?',
    // 'הבחור משכונת אליהו שמתישהו עשה צרות והגיע רחוק אבל היום הוא דווקא בסדר, אני חושב'
  ],
  'numNamesPerPlayer': 4,
  'pairGuesses': {},
  'hasLastGuessForUndo': false,
  'currentTurnGuesses': 0,
  'pairs': [
    [
      '0',
      '1'
    ],
    [
      '2',
      '3'
    ]
  ],
  'players': {
    '0': {
      'pairColor': '#C4B7CB',
      'pairIndex': 0,
      'id': '0',
      'name': 'דן המלך'
    },
    '1': {
      'pairColor': '#C4B7CB',
      'pairIndex': 0,
      'id': '1',
      'name': 'מישהו אחר'
    },
    '2': {
      'pairColor': '#BBC7CE',
      'pairIndex': 1,
      'id': '2',
      'name': 'Dan Kilman The Great'
    },
    '3': {
      'pairColor': '#BBC7CE',
      'pairIndex': 1,
      'id': '3',
      'name': '🇭🇰🇬🇹 🇭🇰🇬🇹 🇭🇰🇬🇹 דן קילמן 🇭🇰🇬🇹 🇭🇰🇬🇹'
    }
  },
  'order': [
    '0',
    '2',
    '1',
    '3'
  ],
}

export default {
  initialNamingState,
  initialStatePlaying,
}
