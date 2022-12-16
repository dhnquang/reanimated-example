import Animated from "react-native-reanimated";

interface Color {
  r: number;
  g: number;
  b: number;
}

interface ColorInterpolation<T extends readonly number[]> {
  inputRange: T;
  outputRange: { [K in keyof T]: Color };
}

const { color, interpolateNode, round } = Animated;

export const interpolateColor = <T extends readonly number[]>(
  value: Animated.Node<number>,
  { inputRange, outputRange }: ColorInterpolation<T>
) => {
  const r = interpolateNode(value, {
    inputRange,
    outputRange: outputRange.map((c) => c.r),
  });
  const g = interpolateNode(value, {
    inputRange,
    outputRange: outputRange.map((c) => c.g),
  });
  const b = interpolateNode(value, {
    inputRange,
    outputRange: outputRange.map((c) => c.b),
  });
  return color(round(r), round(g), round(b));
};
