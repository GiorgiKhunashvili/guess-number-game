import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return randomNumber;
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentLow = useRef(1);
    const currentHigh = useRef(1);

    const nextGuessHandler = diraction => {
        if((diraction === "lower" && diraction < props.userChoice) || (diraction === "greater" && diraction > props.userChoice)){
            Alert.alert("Don't lie", "You know that this is wrong...", [{text: 'Sorry!', style: 'cancel'}]);
            return ;
        }
        if (diraction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow, currentHigh, currentGuess);
        setCurrentGuess(nextNumber);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer selectedNumber={currentGuess} />
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
                <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
            </Card>
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
        width: 300,
        maxHeight: "80%"
    }
});

export default GameScreen;