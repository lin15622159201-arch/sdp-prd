import 'fabric';

declare module 'fabric' {
  namespace fabric {
    interface IObjectOptions {
      id?: string;
    }

    const controlsUtils: {
      scaleSkewCursorStyleHandler: any;
      scalingXOrSkewingY: any;
      scaleOrSkewActionName: any;
      scaleCursorStyleHandler: any;
      scalingEqually: any;
      scalingYOrSkewingX: any;
    };
  }
}
