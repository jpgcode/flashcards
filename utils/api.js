import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'FlashCards:decks'

/**
 * Get decks
 */
export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(res => res ? JSON.parse(res): [])
}

/**
 * Save decks
 * @param {*} id
 * @param {*} title
 */
export function saveDeck(id, title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const newDeck = {
                id,
                title,
                cards: []
            }
            if (results) {
                const data = JSON.parse(results)
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([...data, newDeck]))
            }
            else {
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([newDeck]))
            }

        })
        .catch((err) => console.log(err))
}

/**
 * Save Card
 * @param {*} deckId
 * @param {*} card
 */
export function saveCard(deckId, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const deck = data.find(d => d.id === deckId)
            deck.cards.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
        .catch((err) => console.log(err))
}
