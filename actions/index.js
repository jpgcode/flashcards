export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeck(id, title) {
    return {
        type: ADD_DECK,
        id,
        title,
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    }
}
