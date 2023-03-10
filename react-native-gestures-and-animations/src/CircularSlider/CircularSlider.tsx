import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  sub,
  add,
  cond,
  lessThan,
} from "react-native-reanimated";

import { StyleGuide } from "../components";

import Cursor from "./Cursor";
import CircularProgress from "./CircularProgress";

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

const CircularSlider = () => {
  const start = new Value(0);
  const end = new Value(0);
  const theta = sub(
    cond(lessThan(start, end), end, add(end, Math.PI * 2)),
    start
  );
  const backgroundColor = StyleGuide.palette.primary;
  const rotate = sub(PI, end);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          // @ts-expect-error
          style={{ ...StyleSheet.absoluteFillObject, transform: [{ rotate }] }}
        >
          <CircularProgress
            bg={StyleGuide.palette.background}
            fg={backgroundColor}
            strokeWidth={STROKE_WIDTH}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor
          theta={start}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor }}
        />
        <Cursor
          theta={end}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor }}
        />
      </View>
    </View>
  );
};

export default CircularSlider;
