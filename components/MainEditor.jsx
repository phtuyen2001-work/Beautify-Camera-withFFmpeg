import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import FiltersControl from './FiltersControl'

//Import components from gl-react
import GLImage from "gl-react-image";
import { Surface } from "gl-react-expo";
import { manipulateAsync } from 'expo-image-manipulator';
import Effects from './Effects/Effects';

const deviceWidth = Dimensions.get("window").width

const MainEditor = ({ route, navigation }) => {
    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
            const img = route.params.uri
            const manipResult = await manipulateAsync(
                img,
                [{ resize: { width: deviceWidth } }]
            )
            setImage(manipResult)
        })()
    }, [route])

    return (
        <View style={styles.container}>
            <Surface style={{ width: "100%", height: "100%" }}>
                <Effects
                    
                >
                    <GLImage
                        resizeMode='contain'
                        source={{ uri: image?.uri }}
                    />
                </Effects>
            </Surface>

            <FiltersControl
                stay={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    }
})

export default MainEditor
