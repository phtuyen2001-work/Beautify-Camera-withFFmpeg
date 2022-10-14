import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';

// const img = require("../../assets/photo.jpeg")

const filters = {
    ["Normal"]: [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Juno: [
        1, 0, 0, 0, 0,
        -0.4, 1.3, -0.4, 0.2, -0.1,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Sepia: [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Greyscale: [
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Gingham: [
        2, 0, 0, 0, 0,
        1, 1, 0, 0, 0,
        0.5, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Mayfair: [
        1, 1, 0.5, 0, 0,
        0, 0.5, 1, 0, 0,
        0.5, 0.5, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    Valencia: [
        1, 0, 0, 0, 0,
        -0.2, 1, 0, 0, 0,
        -0.8, 1.6, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
}

export default function FiltersBox() {
    const [selectedFilter, setSelectedFilter] = useState("Normal")

    const handlePress = (item) => {
        setSelectedFilter(item.item)
    }


    const img = useImage(require("../../assets/photo.jpeg"))
    if (img === null) return null;

    return (
        <FlatList
            horizontal
            data={Object.keys(filters)}
            ItemSeparatorComponent={() => (<View style={{ marginHorizontal: 5 }}></View>)}
            keyExtractor={(_, index) => index}
            style={styles.container}
            contentContainerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            renderItem={(item) => (
                <TouchableWithoutFeedback
                    onPress={() => handlePress(item)}
                >
                    <View style={styles.itemWrap}>
                        <Canvas style={{ width: 50, height: 55 }}>
                            {img &&
                                <Image
                                    x={0}
                                    y={0}
                                    fit={"contain"}
                                    width={45}
                                    height={55}
                                    image={img}
                                >
                                    <ColorMatrix matrix={filters[item.item]}/>
                                </Image>
                            }
                        </Canvas>
                        <Text style={[
                            styles.textItem,
                            selectedFilter === item.item && styles.selectedItem
                        ]}
                        >
                            {item.item}
                        </Text>
                        {/* <Image
                                style={styles.img}
                                image={img}
                            />
                            <Text style={[
                                styles.textItem,
                                selectedFilter === item.item.toLowerCase() && styles.selectedItem
                            ]}
                            >
                                {item.item}
                            </Text> */}
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 45,
        height: 55
    },
    itemWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 70
    },
    textItem: {
        color: "#fff",
        marginTop: 5,
        paddingVertical: 1,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 12,
    },
    selectedItem: {
        color: '#ea4c89',
        borderColor: '#ea4c89',
    }
})