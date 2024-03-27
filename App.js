import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/pages/Dashboard";
import { Provider } from "react-redux";
import store from "./src/store/store";

const routerList = [
  {
    name: "dashboard",
    component: Dashboard,
    headerShown: false,
  },
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {routerList.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{ headerShown: item.headerShown }}
                initialParams={{ isSuccess: false }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
