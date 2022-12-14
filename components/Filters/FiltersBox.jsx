import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { setColorMatrix, setColorOffset } from '../../redux/slice/canvasSlice';


import { Surface } from 'gl-react-expo';
import GLImage from 'gl-react-image';
import ColorMatrix from '../Effects/ColorMatrix';

import CloseSVG from '../SVG/CloseSVG';
import CheckSVG from '../SVG/CheckSVG';
const img = require("../../assets/photo.png")
import filters from './Filters';

/**
 * FiltersBox - jsx
 * @prop {string} title - The title of the box
 * @prop {object} sheetRef - The ref of the sheet contains the box
 */

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