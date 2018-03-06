import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'

import { connect } from 'react-redux'
import { addCard } from '../actions'

import { saveCard } from '../utils/api'
import { white, black, red } from '../utils/colors'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        showError: false
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }

    submitCard = () => {

        const { question, answer } = this.state

        if (question, answer) {

            const { deck } = this.props

            const card = {
                question,
                answer,
            }

            this.props.dispatch(addCard(deck.id, card))

            saveCard(deck.id, card)

            this.setState(() => ({
                question: '',
                answer: '',
                showError: false
            }))

            this.props.navigation.goBack();
        }
        else {
            this.setState(() => ({
                showError: true
            }))
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <Text style={{ fontSize: 16, color: black, marginBottom: 5 }}>Question</Text>
                <TextInput placeholder="Add the question text" style={styles.input} onChangeText={(question) => this.setState({ question })} value={this.state.question} />

                <Text style={{ fontSize: 16, color: black, marginBottom: 5 }}>Answer</Text>
                <TextInput placeholder="Add the answer text" style={styles.input} onChangeText={(answer) => this.setState({ answer })} value={this.state.answer} />

                {this.state.showError && (<Text style={{ fontSize: 16, color: red, marginBottom: 10 }}>Both fields are required.</Text>)}

                <TouchableOpacity onPress={this.submitCard}>
                    <Text style={[styles.button, { color: white, backgroundColor: black }]}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: white,
    },
    button: {
        padding: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: Platform.OS === 'ios' ? 6 : 2,
    },
    input: {
        padding: 8,
        height: 35,
        borderWidth: 1,
        marginBottom: 15,
        borderColor: black,
    }
})


function mapStateToProps(decks, { navigation }) {
    return { deck: decks.find(d => d.id === navigation.state.params.deckId) }
}

export default connect(mapStateToProps)(AddCard);
