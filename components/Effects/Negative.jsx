import React from "react";
import { GLSL, Node, Shaders } from "gl-react";

const shaders = Shaders.create({
    negative: {
        frag: GLSL`precision highp float;
  varying vec2 uv;
  uniform sampler2D t;
  uniform float factor;
  void main () {
    vec4 c = texture2D(t, uv);
    gl_FragColor = vec4(mix(c.rgb, 1.0 - c.rgb, factor), c.a);
  }`,
    },
});

const Negative = (props) => {
    const { factor, children: t } = props

    return (
        <Node shader={shaders.negative} uniforms={{ t, factor }} />
    )
}

export default Negative