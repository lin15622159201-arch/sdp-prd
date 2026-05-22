import { fabric } from 'fabric';
import { Ref } from 'vue';
import { FabricElType } from '../types';

interface IProps {
  canvas: FabricElType;
  workspaceConfig: Ref<{ width: number; height: number; }>;
}
export const useEvent = (props: IProps) => {
  const { canvas, workspaceConfig } = props;
  const objectMove = (event: fabric.IEvent) => {
    const obj = event.target;
    const { width, height } = workspaceConfig.value;
    if (obj) {
      if (obj.left! < 0) {
        obj.left = 0;
      }
      if (obj.top! < 0) {
        obj.top = 0;
      }
      if (obj.left! + obj.width! * obj.scaleX! > width) {
        obj.left = width - obj.width! * obj.scaleX!;
      }
      if (obj.top! + obj.height! * obj.scaleY! > height) {
        obj.top = height - obj.height! * obj.scaleY!;
      }
    }
  };
  const objectScale = (event: fabric.IEvent) => {
    const obj = event.target;
    const { width, height } = workspaceConfig.value;
    obj!.scaleX = Math.max(obj?.scaleX!, 0);
    obj!.scaleY = Math.max(obj?.scaleY!, 0);
    if (obj?.left === Infinity) {
      obj.left = 0;
    }
    if (obj?.top === Infinity) {
      obj.top = 0;
    }
    if (obj) {
      if (obj.left! < 0) {
        obj.scaleX = (obj.width! * obj.scaleX! - Math.abs(obj.left!)) / obj.width!;
        obj.left = 0;
      }
      if (obj.top! < 0) {
        obj.scaleY = (obj.height! * obj.scaleY! - Math.abs(obj.top!)) / obj.height!;
        obj.top = 0;
      }
      if (obj.left! + obj.width! * obj.scaleX! > width) {
        obj.scaleX = (width - obj.left!) / obj.width!;
      }
      if (obj.top! + obj.height! * obj.scaleY! > height) {
        obj.scaleY = (height - obj.top!) / obj.height!;
      }
      if (Number.isNaN(obj!.scaleX)) {
        obj.scaleX = 0;
      }
      if (Number.isNaN(obj!.scaleY)) {
        obj.scaleY = 0;
      }
      if (Number.isNaN(obj!.top)) {
        obj.top = 0;
      }
      if (Number.isNaN(obj!.left)) {
        obj.left = 0;
      }
    }
  };
  const init = async () => {
    destroy();
    canvas.value?.on('object:moving', objectMove);
    canvas.value?.on('object:scaling', objectScale);
  };
  const destroy = () => {
    canvas.value?.off('object:moving', objectMove);
    canvas.value?.off('object:scaling', objectScale);
  };
  return {
    init,
  };
};
