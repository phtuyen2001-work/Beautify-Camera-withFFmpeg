import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SideControl from './SideControl'
import FiltersControl from './FiltersControl'

const MainEditor = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{
                        height: "100%"
                    }}
                    source={{uri: route.params.uri}}
                />
            </View>

            <FiltersControl 
                stay={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    }
})

export default MainEditor
