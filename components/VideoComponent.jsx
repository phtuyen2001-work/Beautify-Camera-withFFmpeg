import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Video } from 'expo-av'

// import PlaySVG from './SVG/PlaySVG'
// import PauseSVG from './SVG/PauseSVG'

/**
 * VideoComponent - jsx
 * @prop {object} videoRef - the ref of the Video component
 */

const VideoComponent = (props) => {
    const { onFrame, videoRef, ...rest } = props

    const [videoStatus, setVideoStatus] = useState({})

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
        </Video>
    )
}

export default VideoComponent
