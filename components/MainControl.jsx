import { View, StyleSheet, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import EditSVG from './SVG/EditSVG';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker"
import CameraComponent from './CameraComponent';
import SwitchSVG from './SVG/SwitchSVG';
import { CameraType } from 'expo-camera';

export default function MainControl({ containerStyle }) {
  const [cameraMode, setCameraMode] = useState("photo")
  const [camType, setCamType] = useState(CameraType.back)
  const [previewImg, setPreviewImg] = useState(() => getPreviewPhoto())
  const [isRecording, setIsRecording] = useState(false)

  const camera = useRef()

  // To stop recording when switch to photo mode without stopping the record first
  useEffect(() => {
    if (cameraMode === "photo") {
      setIsRecording(false)
      if (camera.current) camera.current.stopRecording()
    }
  }, [cameraMode])

  //Flip the camera type (back and front)
  const flipCameraType = () => {
    setCamType((current) => (current === CameraType.back ? CameraType.front : CameraType.back))
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

  //Get the newest photo for previewPhoto view
  async function getPreviewPhoto() {
    let arrAssets = await MediaLibrary.getAssetsAsync({
      sortBy: "creationTime",
      mediaType: ["photo", "video"]
    })
    let assetWithID = await MediaLibrary.getAssetInfoAsync(arrAssets.assets[0].id)
    setPreviewImg(assetWithID)
  }

  //To open the user's media library
  const openImagePickerUI = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    // console.log(pickerResult)
  }

  //To take photo with camera
  const takePhoto = async () => {
    if (!camera) return
    const photo = await camera.current.takePictureAsync()

    // console.log(photo)
  }

  //To record video with camera
  const recordVideo = async () => {
    if (!camera) return
    if (!isRecording) {
      setIsRecording(true)
      const video = await camera.current.recordAsync()

      console.log(video)
    }
    else {
      setIsRecording(false)
      camera.current.stopRecording()
    }
  }

  return (
    <View style={{ ...containerStyle }}>

      <CameraComponent
        cameraStyle={{
          flex: 9
        }}
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

      <View style={styles.btnContainer}>
        <View style={styles.cameraBtns}>
          <TouchableOpacity
            // style={styles}
            onPress={openImagePickerUI}
          >
            <Image
              style={styles.libraryImg}
              source={{
                uri: previewImg ? previewImg.localUri : "../assets/photo.jpeg"
              }}
            />
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.sideBtn}
          >
            {/* <Image 
              source={require("../assets/edit.svg")}
            /> */}
            <EditSVG
              width={32}
              height={32}
            />
          </TouchableOpacity>
        </View>

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
  topView: {
    backgroundColor: "rgba(00,00,00, 0.0)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10
  },

  btnContainer: {
    backgroundColor: "#fff",
    flex: 2,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-around"
  },
  cameraBtns: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly"
  },

  sideBtn: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    padding: 3,
  },
  libraryImg: {
    width: 45,
    height: 45,
    borderRadius: 5,
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


  switchBtns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
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