import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }

};

const renderListItem = (value, rounds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{rounds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if( currentGuess === userChoice ){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = diraction => {
        if((diraction === "lower" && currentGuess < props.userChoice) || (diraction === "greater" && currentGuess > props.userChoice)){
            Alert.alert("Don't lie", "You know that this is wrong...", [{text: 'Sorry!', style: 'cancel'}]);
            return ;
        }
        if (diraction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses([nextNumber, ...pastGuesses]);


    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer selectedNumber={currentGuess} />
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler("lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton> 
                <MainButton onPress={() => nextGuessHandler("greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 330,
        maxHeight: "90%"
    },
    listItem: {
        borderColor: Colors.accent,
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    list: {
        alignItems: 'center',

        flexGrow: 1
    },
    listContainer: {
        width: '80%',
        flex: 1
    }
});

export default GameScreen;