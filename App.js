import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import MainEditor from './components/MainEditor';
import MainPanel from './components/MainPanel';
import { store } from './store';

const Stack = createNativeStackNavigator()

export default function App() {

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
