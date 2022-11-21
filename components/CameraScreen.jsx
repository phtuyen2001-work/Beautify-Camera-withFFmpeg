import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library';
import { useDispatch } from 'react-redux';
import { resetCanvas } from '../redux/slice/canvasSlice';

import CameraComponent from './CameraComponent';
import SideControl from './SideControl';
import { showToast } from './CustomToast';

import CameraAltSVG from './SVG/CameraAltSVG';

/**
 * CameraScreen - jsx
 */

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch()

  // To switch camera mode: photo / video
  const [cameraMode, setCameraMode] = useState("photo")
  // To indicate the recording state
  const [isRecording, setIsRecording] = useState(false)
  // To indicate the recording time
  const [recordTime, setRecordTime] = useState(0)
  //To get the preview image  
  const [previewImg, setPreviewImg] = useState(() => getPreviewPhoto())

  const camera = useRef()

  //Get the newest photo for previewPhoto view
  async function getPreviewPhoto() {
    let arrAssets = await MediaLibrary.getAssetsAsync({
      sortBy: "creationTime",
      mediaType: ["photo"]
    })
    let assetWithID = await MediaLibrary.getAssetInfoAsync(arrAssets.assets[0].id)
    setPreviewImg(assetWithID)
  }

  //To open the user's media library
  const openImagePicker = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    })

    if (!pickerResult.cancelled) {
      //reset canvas before navigating to the EditScreen
      dispatch(resetCanvas())
      navigation.navigate("EditScreen", { ...pickerResult })
    }
  }

  const handleOpenGLScreen = () => {
    navigation.navigate("GLScreen")
  }

  // To stop recording when switch to photo mode without stopping the record first
  useEffect(() => {
    if (cameraMode === "photo") {
      setIsRecording(false)
      if (camera.current) camera.current.stopRecording()
    }
  }, [cameraMode])

  // To convert the recording time
  const convertTime = (time) => {
    let minute = Math.floor(time / 60)
    let second = time % 60

    return `${minute.toLocaleString('en', {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
    })}:${second.toLocaleString("en", {
      minimumIntegerDigits: 2,
    })}`
  }

  //To take photo with camera
  const takePhoto = async () => {
    if (!camera) return
    const photo = await camera.current.takePictureAsync()
    showToast("Clicked!")
    navigation.navigate("EditScreen", { ...photo, type: "image" })
  }

  const handleStartRecord = async () => {
    if (!camera) return

    let video;
    if (!isRecording) {
      setIsRecording(true)
      showToast("Start Recording...")

      const interval = setInterval(() => {
        setRecordTime((prev) => prev + 1)
      }, 1000)

      video = await camera.current.recordAsync()

      clearInterval(interval)
      setRecordTime(0)
    }

    if (video) navigation.navigate("EditScreen", { ...video, type: "video" })
  }

  const handleStopRecord = () => {
    setIsRecording(false)
    camera.current.stopRecording()

    showToast("Stop recording!")
  }

  //Switch the camera mode (photo and video)
  const switchMode = (btnPressed) => {
    if (cameraMode === "photo") {
      if (btnPressed === "video") setCameraMode("video")
      else return
    }
    else {
      if (btnPressed === "photo") setCameraMode("photo")
      else return
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Camera component and Gesture handler*/}
      <CameraComponent
        cameraMode={cameraMode}
        cameraRef={camera}
      />

      <View style={styles.actionContainer}>
        <SideControl
          leftBtn={
            <Image
              style={{ width: 45, height: 45, borderRadius: 5, }}
              source={{ uri: previewImg ? previewImg.localUri : "../assets/photo.jpeg" }}
            />
          }
          leftBtnFunc={openImagePicker}
          rightBtnFunc={handleOpenGLScreen}
          rightBtn={
            <View style={{
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 8,
            }}>
              <CameraAltSVG />
            </View>
          }
        >
          {cameraMode === "photo" ?
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={takePhoto}
            >
              <View style={styles.inner}></View>
            </TouchableOpacity>
            :
            <View>
              <TouchableOpacity
                onPress={handleStartRecord}
                style={[styles.actionBtn, { display: isRecording ? "none" : "flex" }]}
              >
                <View style={styles.innerWhite}>
                  <View style={styles.innerRed}></View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleStopRecord}
                style={[styles.actionBtn, { display: isRecording ? "flex" : "none" }]}
              >
                <View style={styles.innerWhite}>
                  <View style={styles.innerSquare}>
                    <Text style={{ fontSize: 12 }}>{convertTime(recordTime)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        </SideControl>

        <View style={styles.switchBtns}>
          <TouchableOpacity
            onPress={() => switchMode("photo")}
            style={[styles.modeView, cameraMode === "photo" ? styles.selectedView : null]}
          >
            <Text style={[{ fontWeight: "700" }, cameraMode === "photo" ? styles.selectedViewText : null]}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => switchMode("video")}
            style={[styles.modeView, cameraMode === "video" ? styles.selectedView : null]}
          >
            <Text style={[{ fontWeight: "700" }, cameraMode === "video" ? styles.selectedViewText : null]}>Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    height: "20%",
    backgroundColor: "#fff",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    bottom: 0,
    left: 0,
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

  switchBtns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5
  },
  modeView: {
    marginHorizontal: 10,
  },
  selectedView: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 90,
    textAlign: "center"
  },
  selectedViewText: {
    color: "#fff",
  },
})