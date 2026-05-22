<template>
  <div ref="editorRef" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
} from 'vue';
import WangEditor from 'wangeditor';
import {
  VALUE_TYPE,
  editorProps,
  defaultOptions,
} from './types';
import { ElMessage } from 'element-plus';
import { uploadFile } from '@/api/open';

export default defineComponent({
  name: 'Editor',
  props: editorProps,
  emits: ['update:modelValue', 'uploadImgSuccess'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLElement>();

    const options = computed(() => Object.assign({}, defaultOptions, props.options));

    let instance: InstanceType<typeof WangEditor> | null;
    // eslint-disable-next-line
    let contentStr = props.modelValue;
    onMounted(() => {
      instance = new WangEditor(editorRef.value);
      Object.assign(
        instance.config,
        {
          // 修改
          onchange() {
            if (props.valueType === VALUE_TYPE.HTML) {
              const html = instance?.txt.html();
              contentStr = html || '';
              emit('update:modelValue', html);
            } else {
              const text = instance?.txt.text();
              contentStr = text || '';
              emit('update:modelValue', text);
            }
          },
          // 上传图片
          async customUploadImg(
            imageList: File[],
            insertToEditor: (url: string) => void
          ) {
            const [image] = imageList;
            if (!/^image/.test(image.type)) {
              ElMessage.warning('图片格式错误');
            } else {
              const formData = new FormData();
              formData.append('files', image, image.name);
              const { data } = await uploadFile(formData);
              const [imageItem] = data;
              insertToEditor(imageItem.url);
              emit('uploadImgSuccess', imageItem);
            }
          },
        },
        {
          // eslint-disable-next-line no-restricted-syntax
          ...options.value,
        }
      );
      instance.create();
      if (props.disabled) {
        instance?.disable();
      } else {
        instance?.enable();
      }
      instance.txt.html(props.modelValue);
    });
    watch(() => props.disabled, (val) => {
      if (val) {
        instance?.disable();
      } else {
        instance?.enable();
      }
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== contentStr) instance?.txt.html(val);
      }
    );

    onBeforeUnmount(() => {
      instance?.destroy();
      instance = null;
    });
    return {
      editorRef,
    };
  },
});
</script>
