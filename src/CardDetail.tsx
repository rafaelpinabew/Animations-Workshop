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
  const { getParam } = useNavigation();
  const { perk, type } = getParam("card");
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Service Call Detail</Text>
      <View>
        <Card {...{ type }} style={styles.image} />
      </View>
      <View style={[styles.details]}>
        <Text style={styles.detail}>Perk: </Text>
        <Text style={styles.detailSub}>{perk}</Text>
      </View>
    </View>
  );
}

export default CardDetail;
