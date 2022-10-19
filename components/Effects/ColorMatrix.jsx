import React from "react";
import { GLSL, Node, Shaders } from "gl-react";

const shaders = Shaders.create({
    ColorMatrix: {
        frag: GLSL`precision highp float;
            varying vec2 uv;
            uniform sampler2D t;
            uniform mat4 m;
            uniform vec4 colorOffset;
            void main () {
                gl_FragColor = m * texture2D(t, uv) + colorOffset;
            }`,
    },
});

const defaultMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]
const defaultOffset = [0, 0, 0, 0]

const ColorMatrix = (props) => {
    const { children: t, matrix = defaultMatrix, offset = defaultOffset } = props

    return (
        <Node
            shader={shaders.ColorMatrix}
            uniforms={{ t, m: matrix, colorOffset: offset }}
        />
    )
}

export default ColorMatrix