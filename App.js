import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainControl from './components/MainControl';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <MainControl
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
