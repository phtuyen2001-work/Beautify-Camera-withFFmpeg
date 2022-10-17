import Toast from "react-native-root-toast";

export function showToast(message="default", options) {
    return Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: -40,
        shadow: true,
        animation: true,
        hideOnPress: true,
        ...options
    })
}