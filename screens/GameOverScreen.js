import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from "../components/MainButton";

import { Colors } from 'react-native/Libraries/NewAppScreen';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText style={styles.gameOverTitle}>The game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} />
            </View>
            <View style={styles.resultsContainer}>
            <BodyText style={styles.resultText}>
                Your phone needed <Text style={styles.highlight}> {props.rounds} </Text> rounds to guess the number
                <Text style={styles.highlight}> {props.userNumber} </Text></BodyText>
            </View>
            {/*<Button title="New Game" onPress={props.onPressNewGame}/>*/}
            <MainButton onPress={() => props.onPressNewGame}>START GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: "100%",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: 'hidden',
        marginVertical: 30
    },
    gameOverTitle: {
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',

    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    resultsContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default GameOverScreen;