import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CameraComponent from './CameraComponent';
import SwitchSVG from './SVG/SwitchSVG';
import { CameraType } from 'expo-camera';
import SideControl from './SideControl';
import FiltersControl from './FiltersControl';
import { Canvas, ColorMatrix } from '@shopify/react-native-skia';
import * as MediaLibrary from 'expo-media-library';

export default function MainPanel({ containerStyle }) {
  const [cameraMode, setCameraMode] = useState("photo")
  const [isRecording, setIsRecording] = useState(false)
  const [camType, setCamType] = useState(CameraType.back)
  const camera = useRef()

  const filtersControl = useRef()

  // const [isFiltersUp, setIsFiltersUp] = useState(-1)
  const handleOpenFilters = () => {
    filtersControl.current?.snapToIndex(0)
  }

  // To stop recording when switch to photo mode without stopping the record first
  useEffect(() => {
    if (cameraMode === "photo") {
      setIsRecording(false)
      if (camera.current) camera.current.stopRecording()
    }
  }, [cameraMode])

  //Flip the camera type (back and front)
  const flipCameraType = () => {
    setCamType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ))
  }

  //To take photo with camera
  const takePhoto = async () => {
    if (!camera) return
    const photo = await camera.current.takePictureAsync()

    console.log(photo)
    MediaLibrary.saveToLibraryAsync(photo.uri)
  }

  //To record video with camera
  const recordVideo = async () => {
    if (!camera) return
    if (!isRecording) {
      setIsRecording(true)
      const video = await camera.current.recordAsync()

      console.log(video)
      MediaLibrary.saveToLibraryAsync(video.uri)
    }
    else {
      setIsRecording(false)
      camera.current.stopRecording()
    }
  }

  return (
    <View style={{ ...containerStyle }}>

      <CameraComponent
        type={camType}
        cameraRef={camera}
      >
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={flipCameraType}
          >
            <SwitchSVG />
          </TouchableOpacity>
        </View>

        {/* <Canvas style={styles.canvas}>
          <ColorMatrix matrix={[
            0.2126, 0.7152, 0.0722, 0, 0,
            0.2126, 0.7152, 0.0722, 0, 0,
            0.2126, 0.7152, 0.0722, 0, 0,
            0, 0, 0, 1, 0,
          ]} />
        </Canvas> */}
      </CameraComponent>

      <SideControl
        cameraMode={cameraMode}
        setCameraModeFunc={setCameraMode}
        openFiltersFunc={handleOpenFilters}
      >
        {cameraMode === "photo" ?
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={takePhoto}
          >
            <View style={styles.inner}></View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={recordVideo}
          >
            {!isRecording ?
              <View style={styles.innerWhite}><View style={styles.innerRed}></View></View>
              :
              <View style={styles.innerWhite}>
                <View style={styles.innerSquare}>
                  <Text style={{ fontSize: 12 }}>00:00</Text>
                </View>
              </View>
            }
          </TouchableOpacity>
        }
      </SideControl>

      <FiltersControl
        filtersControlRef={filtersControl}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  topView: {
    top: 10,
    right: 10,
    backgroundColor: "rgba(00,00,00, 0.0)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  canvas: {
    flex: 1,
  },

  actionBtn: {
    backgroundColor: "#B1E4E7",
    width: 70,
    height: 70,
    borderRadius: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: "#fff",
    width: 55,
    height: 55,
    borderRadius: 90,
    // borderColor: "#fff",
    // borderWidth: 8
  },
  innerWhite: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerRed: {
    backgroundColor: "#f08080",
    width: 50,
    height: 50,
    borderRadius: 90,
    // borderColor: "#fff",
    // borderWidth: 5,
  },
  innerSquare: {
    backgroundColor: "#f08080",
    width: 42,
    height: 42,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
})