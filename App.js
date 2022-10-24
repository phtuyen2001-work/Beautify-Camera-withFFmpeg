import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import EditScreen from './components/EditScreen';
import CameraScreen from './components/CameraScreen';
import AnimatedAppLoader from './components/SplashScreen/AnimatedAppLoader';
import { store } from "./redux/store"
import { RootSiblingParent } from 'react-native-root-siblings';
import "webgltexture-loader-expo-camera";
import GLScreen from './components/GLScreen';
// import "webgltexture-loader-expo"

const Stack = createNativeStackNavigator()

function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden />
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='CameraScreen'
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name='CameraScreen'
              component={CameraScreen}

            />
            <Stack.Screen
              name='EditScreen'
              component={EditScreen}
            />
            <Stack.Screen 
              name='GLScreen'
              component={GLScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default function App() {
  const image = {
    uri: require("./assets/splash.png")
  }

  return (
    <AnimatedAppLoader image={image}>
      <Provider store={store}>
        <RootSiblingParent>
          <Main />
        </RootSiblingParent>
      </Provider>
    </AnimatedAppLoader>
  );
}