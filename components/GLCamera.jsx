import React, { useEffect, useReducer } from 'react'
import { GLSL, Node, Shaders } from 'gl-react';
import CameraComponent from './CameraComponent';

const shader = Shaders.create({
    YFlip: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        void main(){
            gl_FragColor=texture2D(t, vec2(1.0 - uv.x, 1.0 - uv.y));
        }`,
    },
})

const GLCamera = (props) => {
    const { cameraRef } = props

    // force update tricks for functional components
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        let stopId;
        const loop = () => {
            stopId = requestAnimationFrame(loop)
            forceUpdate()
        }
        loop()
        return () => {
            console.log("cancel");
            cancelAnimationFrame(stopId)
        }
    }, [])
    
    return (
        <Node
            blendFunc={{ src: "one", dst: "one minus src alpha" }}
            shader={shader.YFlip}
            uniforms={{
                t: () => props.cameraRef.current || null
            }}
        >
            <CameraComponent cameraRef={cameraRef} />
        </Node>
    )
}

export default GLCamera