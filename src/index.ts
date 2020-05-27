import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createAppContainer } from "react-navigation";
import { Extrapolate } from "react-native-reanimated";

import CardList from "./App";
import CardDetail from "./CardDetail";

export default createAppContainer(
  createSharedElementStackNavigator(
    {
      CardList,
      CardDetail,
    },
    {
      mode: "modal",
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      router: "1",
      headerMode: "none",
      defaultNavigationOptions: {
        cardStyleInterpolator: ({ current: { progress } }) => {
          const opacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          });
          return { cardStyle: { opacity } };
        },
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent",
        },
      },
    }
  )
);
