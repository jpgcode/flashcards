import React from 'react';
import { View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

import { purple, white, gray, black } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

// Tab navigator settings
const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={25} color={tintColor} />
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={25} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? black : white,
        style: {
            backgroundColor: Platform.OS === 'ios' ? white : black,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

// Stack navigator settings
const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    }
})

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={ createStore(reducer) }>
                <View style={{ flex: 1 }}>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}
