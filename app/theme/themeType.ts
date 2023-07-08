interface ModerateScaleType {
  (size: number, factor?: number): number;
}
interface HorizontalScaleType {
  (size: number): number;
}
interface VerticalScaleType {
  (size: number): number;
}
interface GlobalMetricsType {
  isAndroid: boolean;
  isIos: boolean;
}

export type {
  ModerateScaleType,
  HorizontalScaleType,
  VerticalScaleType,
  GlobalMetricsType,
};
