import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  multiply,
  useCode,
  block,
  cond,
  call,
  eq,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  usePanGestureHandler,
  diffClamp,
  withDecay,
  interpolateColor,
} from "react-native-redash";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Card, { CARD_HEIGHT } from "./Card";

const colors = {
  white: "rgba(255, 255, 255, 1)",
  transparent: "rgba(255, 255, 255, 0.7)",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 30,
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: "Avenir-Heavy",
  },
  detail: {
    fontFamily: "Avenir-Heavy",
  },
  detailSub: {
    fontFamily: "Avenir-Book",
  },
  details: {
    marginTop: 100,
    marginBottom: 30,
  },
});

function CardDetail() {
  const { getParam, goBack } = useNavigation();
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const { perk, type, id } = getParam("card");
  const y = interpolate(translation.y, {
    inputRange: [0, CARD_HEIGHT],
    outputRange: [0, CARD_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundColor = interpolateColor(translation.y, {
    inputRange: [0, CARD_HEIGHT],
    outputRange: [colors.white, colors.transparent],
  });
  const translateY = withDecay({ value: y, velocity: velocity.y, state });
  const opacity = interpolate(y, {
    inputRange: [0, CARD_HEIGHT / 2],
    outputRange: [1, 0],
  });
  function snapBack() {
    goBack();
  }

  useCode(() => block([cond(eq(state, State.END), call([], snapBack))]), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.title]}>Service Call Detail</Text>
        <Animated.View style={[{ transform: [{ translateY }] }]}>
          <SharedElement id={id}>
            <Card {...{ type }} style={styles.image} />
          </SharedElement>
        </Animated.View>
        <Animated.View style={[styles.details, { opacity }]}>
          <Text style={styles.detail}>Perk: </Text>
          <Text style={styles.detailSub}>{perk}</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

CardDetail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const card = navigation.getParam("card");
  return [card.id];
};

export default CardDetail;
