<script lang="tsx">
import { ElDialog } from 'element-plus';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'VideoPlayDialog',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const videoUrl = computed(() => props.url);
    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        emit('update:modelValue', v);
      }
    });

    const videoRef = ref<InstanceType<typeof HTMLVideoElement>>();
    const setVideoRef = (el: any) => {
      videoRef.value = el;
    };

    const handleClose = () => {
      videoRef.value?.pause();
    };
    const handleOpened = () => {
      videoRef.value?.play();
    };
    return {
      setVideoRef,
      videoRef,
      videoUrl,
      visible,
      handleClose,
      handleOpened,
    };
  },
  render() {
    return (
      <ElDialog
        v-model={this.visible}
        onClose={this.handleClose}
        onOpened={this.handleOpened}
        closeOnClickModal={false}
        destroyOnClose
        width='600px'
        title='视频'
      >
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={this.setVideoRef}
            controls
            class='tw-w-[100%] tw-max-h-[500px]'
          >
            <source src={this.videoUrl} type='video/mp4' />
            <source src={this.videoUrl} type='video/quicktime' />
            <source src={this.videoUrl} type='video/ogg' />
            <source src={this.videoUrl} type='video/webm' />
            <object data={this.videoUrl}>
              <embed src={this.videoUrl} />
            </object>
          </video>
        </div>
      </ElDialog>
    );
  },
});
</script>
