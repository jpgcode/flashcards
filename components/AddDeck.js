import React, { Component } from 'react'
import { Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'
import { addDeck } from '../actions'

import { blue, white, black, gray, red } from '../utils/colors'
import { saveDeck } from '../utils/api'

class AddDeck extends Component {

    state = {
        title: '',
        showError: false
    }

    onDeckSubmit = () => {

        const {title} = this.state

        // Validate input
        if (!title) {
            this.setState(() => ({
                showError: true
            }))
        }else{
            const id = Math.random().toString(36).substr(-8)

            this.props.dispatch(addDeck(id, title))

            saveDeck(id, title)

            this.setState(() => ({
                title: '',
                showError: false
            }))

            this.props.navigation.navigate('DeckView',{ deckId: id, title })
        }

    }

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <Text style={{fontSize: 45, color: black, marginTop: 50, marginBottom: 10, textAlign: 'center'}}>What is the title of your new deck?</Text>
                <TextInput placeholder="Deck title" style={styles.input} onChangeText={(title) => this.setState({title})} value={this.state.title} />

                {this.state.showError && (<Text style={{fontSize: 16, color: red, marginBottom: 10}}>Please enter a deck title</Text>)}

                <TouchableOpacity onPress={this.onDeckSubmit}>
                    <Text style={[styles.button, {color: white, backgroundColor: black}]}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }

}

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
    },
    button: {
        borderRadius: Platform.OS === 'ios' ? 6 : 2,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 15,
        padding: 8,
    }
  })

export default connect()(AddDeck);
