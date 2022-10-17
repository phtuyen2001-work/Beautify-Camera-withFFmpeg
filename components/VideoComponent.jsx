import React, { useState } from 'react'
import { Video } from 'expo-av'
import { TouchableOpacity, View } from 'react-native'
import PlaySVG from './SVG/PlaySVG'
import PauseSVG from './SVG/PauseSVG'

const VideoComponent = (props) => {
    const { onFrame, videoRef, ...rest } = props

    const [videoStatus, setVideoStatus] = useState({})

    // useEffect(() => {
    //     const loop = () => {
    //         const raf = requestAnimationFrame(loop)
    //     }
    // }, [])

    /**
     * To handle the status of video
     */
    const togglePlay = () => {
        if (videoStatus.isPlaying) {
            videoRef.current?.pauseAsync()
        }
        else {
            videoRef.current?.playAsync()
        }
    }

    return (
        <Video
            ref={videoRef}
            style={{
                width: "100%",
                height: 400
            }}
            onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
            {...rest}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: 'center',
                    zIndex: 1,
                }}
            >
                <TouchableOpacity
                    onPress={togglePlay}
                >
                    {!videoStatus.isPlaying ? <PlaySVG /> : <PauseSVG />}
                </TouchableOpacity>
            </View>
        </Video>
    )
}

export default VideoComponent
