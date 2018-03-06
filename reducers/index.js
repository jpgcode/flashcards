import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return action.decks
        case ADD_DECK:
            const newDeck = {
                id: action.id,
                title: action.title,
                cards: []
            }
            return [...state, newDeck]
        case ADD_CARD:
            return state.map((deck) => {
                if (deck.id === action.deckId) {
                    deck.cards = [...deck.cards, action.card]
                }
                return {
                    id: deck.id,
                    title: deck.title,
                    cards: deck.cards,
                };
            });
        default:
            return state
    }
}

export default decks
