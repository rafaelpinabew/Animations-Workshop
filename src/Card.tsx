import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
  },
});

export enum Cards {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
}

interface CardProps {
  type: Cards;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export default ({ type, onPress, style }: CardProps) => {
  let source: number;
  switch (type) {
    case Cards.Card1:
      source = require("../assets/card1.jpeg");
      break;
    case Cards.Card2:
      source = require("../assets/card2.jpg");
      break;
    case Cards.Card3:
      source = require("../assets/card3.jpg");
      break;
    case Cards.Card4:
      source = require("../assets/card4.jpg");
      break;
    case Cards.Card5:
      source = require("../assets/card5.jpg");
      break;
    case Cards.Card6:
      source = require("../assets/card6.jpg");
      break;
    case Cards.Card7:
      source = require("../assets/card7.png");
      break;
    default:
      throw Error("Invalid card style");
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image style={[styles.card, style]} {...{ source }} />
    </TouchableWithoutFeedback>
  );
};
