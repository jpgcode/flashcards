import React, { Component } from 'React'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'

import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

import { fetchDecks } from '../utils/api'
import { blue, white, gray, black } from '../utils/colors'

import { AppLoading } from 'expo'


class DeckList extends Component {

    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

        fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    render() {

        const { ready } = this.state
        const { decks } = this.props

        if (!ready) {
            return <AppLoading />
        }

        return (
            <View style={{ flex: 1 }} >
                {decks.length === 0 ? (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddDeck') }}>
                            <Text style={{ textAlign: 'center', color: blue, fontSize: 22, fontWeight: 'bold' }}>Add Deck</Text>
                        </TouchableOpacity>
                    </View>
                )
                    : (
                        <View style={{marginTop: 25}}>
                            <FlatList style={{ paddingBottom: 15 }}
                                data={decks}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate(
                                            'DeckView',
                                            { deckId: item.id, title: item.title }
                                        )}
                                    >
                                        <View style={styles.item}>
                                            <Text style={{ color: black, fontSize: 25 }}>{item.title}</Text>
                                            <Text style={{ fontSize: 16, color: gray }}>{item.cards.length} {item.cards.length !== 1 ? 'cards' : 'card'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    )}
            </View>
        )
    }

}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)
