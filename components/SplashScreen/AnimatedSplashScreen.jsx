import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync()

export default function AnimatedSplashScreen({ children, image }) {
    const animation = useMemo(() => new Animated.ValueXY(), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);

    useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: {x: -Dimensions.get('window').width, y: 0},
                duration: 500,
                useNativeDriver: true
            }).start(() => setSplashAnimationComplete(true))
        }
    }, [isAppReady])

    // When Loading is done
    const onImageLoaded = useCallback(async () => {
        try {
            await SplashScreen.hideAsync()
        }
        catch (e) {

        }
        finally {
            setAppReady(true)
        }
    }, [])

    // const onImageLoaded = useCallback(() => {
    //     setAppReady(true)
    // }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* App is running */}
            {isAppReady && children}

            {/* Loading screen */}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.manifest.splash.backgroundColor,
                            transform: [{
                                translateX: animation.x
                            }]
                        }
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: Constants.manifest.splash.resizeMode || "contain",
                            // transform: [{
                            //     scale: animation
                            // }]
                        }}
                        source={
                            image.uri
                        }
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    )
}