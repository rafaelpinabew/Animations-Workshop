import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card, { CARD_HEIGHT, Cards } from "./Card";

const MARGIN = 20;

const cards = [
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
  {
    type: Cards.Card4,
  },
  {
    type: Cards.Card5,
  },
  {
    type: Cards.Card6,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      {cards.map(({ type }, index) => {
        return (
          <View style={styles.card}>
            <Card { ...{ type }} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  card: {
    marginVertical: MARGIN,
  },
});
