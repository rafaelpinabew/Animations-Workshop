import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import Animated from "react-native-reanimated";
import {
  usePanGestureHandler,
  withDecay,
  diffClamp,
} from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import Card, { CARD_HEIGHT, Cards } from "./Card";

const { interpolate, Extrapolate, add } = Animated;
const { height } = Dimensions.get("window");

const MARGIN = 20;

const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const cards = [
  {
    type: Cards.Card1,
    id: "1",
    perk: "Watch TV with premium content",
  },
  {
    type: Cards.Card2,
    id: "2",
    perk: "Play videogames",
  },
  {
    type: Cards.Card3,
    id: "3",
    perk: "Call your friends",
  },
  {
    type: Cards.Card4,
    id: "4",
    perk: "Read the paper",
  },
  {
    type: Cards.Card5,
    id: "5",
    perk: "Watch TV with premium content",
  },
  {
    type: Cards.Card6,
    id: "6",
    perk: "Surf the web",
  },
  {
    type: Cards.Card7,
    id: "7",
    perk: "Surf the web",
  },
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    marginVertical: MARGIN,
  },
});

export default function App() {
  const { navigate } = useNavigation();
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const [containerHeight, setContainerHeight] = React.useState(height);
  const visibleCards = containerHeight / HEIGHT;
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -HEIGHT * cards.length + HEIGHT * visibleCards,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={[styles.container]}
        onLayout={({ nativeEvent }) => {
          setContainerHeight(nativeEvent.layout.height);
        }}
      >
        {cards.map(({ type, id, perk }, index) => {
          const positionY = add(y, index * HEIGHT);
          const isDissapearing = -HEIGHT;
          const isTop = 0;
          const isAppearing = HEIGHT * (visibleCards - 1);
          const isBottom = HEIGHT * visibleCards;
          const translateY = interpolate(y, {
            inputRange: [-HEIGHT * index, 0],
            outputRange: [-HEIGHT * index, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          const scale = interpolate(positionY, {
            inputRange: [isDissapearing, isTop, isAppearing, isBottom],
            outputRange: [0.7, 1, 1, 0.7],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionY, {
            inputRange: [isDissapearing, isTop, isAppearing, isBottom],
            outputRange: [0, 1, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              key={index}
              style={[
                { opacity },
                styles.card,
                { transform: [{ translateY }, { scale }] },
              ]}
            >
              <SharedElement id={id}>
                <Card
                  {...{ type }}
                  onPress={() => {
                    navigate("CardDetail", { card: { type, perk, id } });
                  }}
                />
              </SharedElement>
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
}
