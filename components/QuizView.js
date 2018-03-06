import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

import { purple, white, gray, black, green, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

    state = {
        score: 0,
        frontSide: true,
        currentQuestion: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Quiz' }
    }

    flipCard = () => {
        this.setState((state) => ({
            frontSide: !state.frontSide
        }))
    }

    setScore = (correct) => {
        this.setState((state) => ({
            score: correct ? state.score + 1 : state.score,
            frontSide: true,
            currentQuestion: state.currentQuestion + 1,
        }))
    }

    resetQuiz = () => {
        this.setState(() => ({
            score: 0,
            frontSide: true,
            currentQuestion: 0,
        }))
    }

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    render() {

        const { deck, navigation } = this.props
        const { score, currentQuestion, frontSide } = this.state
        const card = deck.cards[currentQuestion]
        const lastCard = currentQuestion === deck.cards - 1

        return (
            <View style={styles.container}>
                {!card ? (

                    <View style={styles.card}>

                        <Text style={{ color: black, fontSize: 35, marginBottom: 20 }}>Score: {(100 / deck.cards.length * score).toFixed(2)}%</Text>

                        <TouchableOpacity onPress={this.resetQuiz}>
                            <Text style={{ color: red, fontSize: 15, fontWeight: 'bold', marginBottom: 20 }}>Restart Quiz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ color: red, fontSize: 15, fontWeight: 'bold' }}>Back to deck</Text>
                        </TouchableOpacity>

                    </View>

                )
                    : (

                        <View style={{ flex: 1 }}>

                            <Text style={{ fontSize: 16 }}>{currentQuestion + 1}/{deck.cards.length}</Text>

                            <View style={styles.card}>
                                {frontSide ? (

                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: black, fontSize: 40, marginBottom: 10, textAlign: 'center' }}>{card.question}</Text>
                                        <TouchableOpacity onPress={this.flipCard}>
                                            <Text style={{ color: red, fontSize: 20, fontWeight: 'bold' }}>Answer</Text>
                                        </TouchableOpacity>
                                    </View>

                                ) : (
                                        <View>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: black, fontSize: 40, marginBottom: 10, textAlign: 'center' }}>{card.answer}</Text>
                                                <TouchableOpacity onPress={this.flipCard}>
                                                    <Text style={{ color: red, fontSize: 20, fontWeight: 'bold' }}>Question</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ marginTop: 40 }}>
                                                <TouchableOpacity onPress={() => this.setScore(true)} >
                                                    <Text style={[styles.button, { backgroundColor: green, color: white }]}>Correct</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setScore(false)} >
                                                    <Text style={[styles.button, { backgroundColor: red, color: white }]}>Incorrect</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    card: {
        flex: 1,
        padding: 20,
        marginTop: 17,
        marginBottom: 17,
        alignItems: 'center',
        backgroundColor: white,
        justifyContent: 'center',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
    button: {
        padding: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: Platform.OS === 'ios' ? 6 : 2,
    },
})

function mapStateToProps(decks, { navigation }) {
    return { deck: decks.find(d => d.id === navigation.state.params.deckId) }
}

export default connect(mapStateToProps)(Quiz);
