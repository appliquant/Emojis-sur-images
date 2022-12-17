import { useEffect } from "react";
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const EmojiSticker = ({ imageSize, stickerSource }: { imageSize: number; stickerSource: string }) => {
  const { width, height } = useWindowDimensions();

  // Shared values
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const DRAG_SPEED_DECELERATOR = 2;

  const MIN_SCALE = 3;
  const HIT_SLOPE = 100;
  const scale = useSharedValue(MIN_SCALE);
  const savedScale = useSharedValue(MIN_SCALE);

  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const logPos = (pos: { x: number; y: number }) => {
    console.log(`Position : ${pos.x}, ${pos.y}`);
  };

  // Gestures
  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: (e.translationX + start.value.x) / DRAG_SPEED_DECELERATOR,
        y: (e.translationY + start.value.y) / DRAG_SPEED_DECELERATOR,
      };
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      runOnJS(logPos)({ x: e.x, y: e.y });
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation * 2;
    })
    .onEnd((e) => {
      savedRotation.value = rotation.value;
    });

  // Scale gesture
  const scaleGesture = Gesture.Pinch()
    .hitSlop({
      vertical: HIT_SLOPE,
      horizontal: HIT_SLOPE,
    })
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd((e) => {
      if (scale.value < MIN_SCALE) {
        scale.value = MIN_SCALE;
      }
      savedScale.value = scale.value;
    });

  // Animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value) },
        {
          translateX: withSpring(offset.value.x, {
            damping: 100,
            velocity: 10,
          }),
        },
        {
          translateY: withSpring(offset.value.y, {
            damping: 100,
            velocity: 10,
          }),
        },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  // Composed gestures
  const scalingGestures = Gesture.Exclusive(scaleGesture);
  const rotateAndScaleGestures = Gesture.Simultaneous(rotateGesture, scalingGestures);
  const composedGestures = Gesture.Simultaneous(dragGesture, rotateAndScaleGestures);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={composedGestures}>
        <View
          hitSlop={{ bottom: HIT_SLOPE, top: HIT_SLOPE, left: HIT_SLOPE, right: HIT_SLOPE }}
          style={[
            {
              top: -height / 4,
              right: -width / 2,
              zIndex: 100,
            },
          ]}>
          <AnimatedImage
            // @ts-ignore
            source={stickerSource}
            resizeMode="contain"
            style={[{ width: imageSize, height: imageSize }, animatedStyles]}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default EmojiSticker;

const styles = StyleSheet.create({});
