const imageOptions = {
    contrast: {
        initialValue: 1,
        minimumValue: 0,
        maximumValue: 4,
        step: 0.1,
    },
    saturation: {
        initialValue: 1,
        minimumValue: 0,
        maximumValue: 10,
        step: 0.1,
    },
    brightness: {
        initialValue: 1,
        minimumValue: 0,
        maximumValue: 4,
        step: 0.1,
    },
    blur: {
        initialValue: 0,
        minimumValue: 0,
        maximumValue: 6,
        step: 0.05,
    },
    negative: {
        initialValue: 0,
        minimumValue: 0,
        maximumValue: 1,
        step: 0.05,
    },
    flyeye: {
        initialValue: 0,
        minimumValue: 0,
        maximumValue: 1,
        step: 0.05,
    }
}

const videoOptions = {
    contrast: {
        initialValue: 1.0,
        minimumValue: -1000,
        maximumValue: 1000,
        step: 1,
    },
    saturation: {
        initialValue: 1.0,
        minimumValue: 0,
        maximumValue: 3,
        step: 0.1,
    },
    brightness: {
        initialValue: 0.0,
        minimumValue: -1,
        maximumValue: 1,
        step: 0.1,
    },
    gamma: {
        initialValue: 1.0,
        minimumValue: 0.1,
        maximumValue: 10,
        step: 0.1,
    }
    // blur: {
    //     initialValue: 0,
    //     minimumValue: 0,
    //     maximumValue: 6,
    //     step: 0.05,
    // },
}

export {
    imageOptions,
    videoOptions
}