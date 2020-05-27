import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createAppContainer } from "react-navigation";

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
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent",
        },
      },
    }
  )
);
