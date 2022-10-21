import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CloseSVG from '../SVG/CloseSVG';
import CheckSVG from '../SVG/CheckSVG';
import { Surface } from 'gl-react-expo';
import ColorMatrix from '../Effects/ColorMatrix';
import GLImage from 'gl-react-image';
import { useDispatch } from 'react-redux';
import { setColorMatrix, setColorOffset } from '../../redux/slice/canvasSlice';

const img = require("../../assets/photo.jpeg")

const filters = [
    {
        name: "Normal",
        matrix: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Juno",
        matrix: [
            1, -0.4, 0, 0,
            0, 1.3, 0, 0,
            0, -0.4, 1, 0,
            0, 0.2, 0, 1,
        ],
        offset: [0, -0.1, 0, 0]
    },
    {
        name: "Sepia",
        matrix: [
            0.393, 0.349, 0.272, 0,
            0.769, 0.686, 0.534, 0,
            0.189, 0.168, 0.131, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Grayscale",
        matrix: [
            0.259, 0.259, 0.259, 0,
            0.7152, 0.7152, 0.7152, 0,
            0.0722, 0.0722, 0.0722, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Gingham",
        matrix: [
            2, 1, 0.5, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Mayfair",
        matrix: [
            1, 0, 0.5, 0,
            1, 0.5, 0.5, 0,
            0.5, 1, 1, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Valencia",
        matrix: [
            1, -0.2, -0.8, 0,
            0, 1, 1.6, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Nvision",
        matrix: [
            0.1, 0.3, 0, 0,
            0.4, 1, 0, 0,
            0, 0.3, 0.1, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Warm",
        matrix: [
            1.06, 0, 0, 0,
            0, 1.01, 0, 0,
            0, 0, 0.93, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
    {
        name: "Cool",
        matrix: [
            0.99, 0, 0, 0,
            0, 0.93, 0, 0,
            0, 0, 1.08, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0]
    },
]

export default function FiltersBox(props) {
    const { title, sheetRef } = props
    const [selectedFilter, setSelectedFilter] = useState("Normal")

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setColorMatrix([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]))
        dispatch(setColorOffset([0, 0, 0, 0]))
        setSelectedFilter("Normal")
        sheetRef.current?.close()
    }

    const handleCheck = () => {
        sheetRef.current?.close()
    }

    const handlePress = (item) => {
        setSelectedFilter(item.name)
        dispatch(setColorMatrix(item.matrix))
        dispatch(setColorOffset(item.offset))
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={handleClose}
                >
                    <CloseSVG />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={handleCheck}
                >
                    <CheckSVG />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
                {filters.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => handlePress(item)}
                    >
                        <View style={styles.itemWrap}>
                            <Surface
                                style={{ width: 45, height: 55 }}
                            >
                                <ColorMatrix matrix={item.matrix} offset={item.offset}>
                                    <GLImage
                                        resizeMode='contain'
                                        source={img}
                                    />
                                </ColorMatrix>
                            </Surface>
                            <Text style={[
                                styles.textItem,
                                selectedFilter === item.name && styles.selectedItem
                            ]}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    title: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 17,
    },

    contentContainer: {
        display: "flex",
        alignItems: "center"
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