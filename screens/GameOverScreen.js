import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over</TitleText>
            <BodyText>Number of rounds: {props.rounds}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="New Game" onPress={props.onPressNewGame}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;