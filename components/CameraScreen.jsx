import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CameraComponent from './CameraComponent';
import SwitchSVG from './SVG/SwitchSVG';
import { CameraType } from 'expo-camera';
import SideControl from './SideControl';
import FiltersControl from './FiltersControl';
import { showToast } from './CustomToast';

export default function CameraScreen({ navigation }) {
  //To switch the camera type: front / back
  const [camType, setCamType] = useState(CameraType.back)
  // To switch camera mode: photo / video
  const [cameraMode, setCameraMode] = useState("photo")
  // To indicate the recording state
  const [isRecording, setIsRecording] = useState(false)
  // To indicate the recording time
  const [recordTime, setRecordTime] = useState(0)

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

  // To convert the recording time
  const convertTime = (time) => {
    let minute = Math.floor(time/60)
    let second = time%60

    return `${minute.toLocaleString('en', {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
    })}:${second.toLocaleString("en", {
      minimumIntegerDigits: 2,
    })}`
  }

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
    showToast("Clicked")

    // console.log(photo)
    navigation.navigate("EditScreen", { ...photo, type: "image" })
    // MediaLibrary.saveToLibraryAsync(photo.uri)
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

  return (
    <View style={{ flex: 1 }}>
      {/* Camera component and Gesture handler*/}
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