import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import MainEditor from './components/MainEditor';
import MainPanel from './components/MainPanel';
import AnimatedAppLoader from './components/SplashScreen/AnimatedAppLoader';
import { store } from './store';

const Stack = createNativeStackNavigator()

function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MainPanel'>
          <Stack.Screen
            name='MainPanel'
            component={MainPanel}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='MainEditor'
            component={MainEditor}
            options={{
              headerStyle: {
                backgroundColor: "#000"
              },
              title: "",

            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default function App() {

  const image = {
    uri: require("./assets/splash.png")
  }

  return (
    <AnimatedAppLoader image={image}>
      <Main />
    </AnimatedAppLoader>
  );
}