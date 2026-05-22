<script lang="tsx">
import { defineComponent, ref, computed, reactive } from 'vue';
import {
  ArrowRight,
  ArrowDown,
  ZoomIn,
  Delete,
  ArrowLeft,
  ArrowUp,
  Download,
  VideoPlay,
} from '@element-plus/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next';
import TextFileList from './text-file-list.vue';
import useFileList from './hooks/use-file-list';
import ImageViewer from '@/components/image-viewer';
import type { PropType } from 'vue';
import type { IScope } from '@/components/image-viewer';
import type { IFileData, TSetFileWrapperStyle } from './types';
import useOssUlrSize from './hooks/use-oss-url-size';
import VideoPlayDialog from './video-play-dialog.vue';

export default defineComponent({
  name: 'FileList',
  components: {
    ArrowRight,
    ArrowDown,
    ZoomIn,
    Delete,
    ArrowLeft,
    ArrowUp,
    Download,
    VideoPlay,
    ImageViewer,
    VideoPlayDialog
  },
  props: {
    list: {
      type: Array as PropType<IFileData[]>,
      default: () => ([]),
    },
    /**
     * 文件列表的类型: picture-card text
     * 默认：picture-card
     */
    listType: {
      type: String,
      default: 'picture-card',
      validator: (val: string) => {
        return ['picture-card', 'text'].includes(val);
      },
    },
    /**
     * listType = 'text' 时列表有图片是否以 picture-card 形式显示
     * 默认 false
     */
    showListTypeImg: {
      type: Boolean,
      default: false,
    },
    /**
     * 设置 file item 样式
     *
     * 使用场景针对特殊情况，如每项需要不同的特色样式
     */
    setFileWrapperStyle: {
      type: Function as PropType<TSetFileWrapperStyle>,
    },
  },
  setup(props) {
    const activeIndex = ref<null | number>(null);

    const {
      uploaderRef,
      handleMove,
      handleDel,
      handlePreview,
      handleDownload,
    } = useFileList(props);

    const uploaderSize = computed(() => {
      return uploaderRef.size;
    });

    const { getOssUrlSize } = useOssUlrSize();

    const imageClassName = computed(() => {
      return ['file-item__image', `file-item__image--${uploaderSize.value}`].join(' ');
    });

    const videoClassName = computed(() => {
      return ['file-item__video', `file-item__video--${uploaderSize.value}`].join(' ');
    });

    // 视频播放
    const videoPlayData = reactive({
      visible: false,
      url: '',
    });
    const handleVideoPlay = (item: IFileData) => {
      videoPlayData.url = item.url;
      videoPlayData.visible = true;
    };

    return {
      uploaderSize,
      uploaderRef,
      activeIndex,
      imageClassName,
      videoClassName,

      videoPlayData,
      handleVideoPlay,

      previewList: computed(() => {
        return props.list.filter((item) => {
          return !item.type || item.type.indexOf('image/') === 0;
        }).map(item => item.url);
      }),

      handleDel,

      handleMove,
      handlePreview,
      selfList: computed({
        get() {
          return props.list;
        },
        set(val: IFileData[]) {
          const hasLoading = val.some(item => item.loading);

          if (!hasLoading && uploaderRef.move) {
            uploaderRef.emit('update:modelValue', val);

            uploaderRef.emit('change', val);
          }
        },
      }),
      getOssUrlSize,
      handleDownload,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    };
  },
  render() {
    if (this.$props.listType === 'text') {
      return (
        <TextFileList
          list={this.selfList}
          show-list-type-img={this.showListTypeImg}
          v-slots={{
            prepend: this.$slots.prepend,
            after: this.$slots.after,
            'list-item': this.$slots?.['list-item'],
          }}
        />
      );
    }
    const fileWrapClassName = `file-item__${this.uploaderRef!.size}`;

    // 是否视频文件
    const videoTypes = ['mp4', 'webm', 'ogg', 'mov'];
    const isVideoType = (obj: IFileData) => {
      const _type = obj.url?.split('.')?.pop()?.split('?')?.[0]?.toLowerCase?.();
      return (_type && videoTypes.includes(_type)) || obj.type?.startsWith('video');
    };
    // 是否图片文件
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const isImageType = (obj: IFileData) => {
      const _type = obj.url?.split('.')?.pop()?.split('?')?.[0]?.toLowerCase?.();
      if (_type === 'webp') obj.fake = true;
      return (_type && imageTypes.includes(_type)) || obj.type?.startsWith('image') || false;
    };

    // 上传进度
    const uploadLoadingRender = (item: IFileData) => {
      return (
        <div class={['file-item__loading--dashboard', this.uploaderSize]} v-show={item.loading}>
          <el-progress
            percentage={+item.progress! || 0}
            color={this.colors}
          />
        </div>
      );
    };
    // 左移
    const prevIconRender = (item: IFileData, i: number) => {
      return (
        <div
          class='file-tools__point'
          onClick={() => this.handleMove(i > 0 && !item.loading, i - 1, i, item)}
        >
          {
            !this.uploaderRef!.disabled && this.uploaderRef!.move && i
              ? (
                <el-icon size={20}>
                  {
                    this.uploaderRef.direction === 'row'
                      ? <arrow-left />
                      : <arrow-up />
                  }
                </el-icon>
              )
              : null
          }
        </div>
      );
    };
    // 视频播放
    const playIconRender = (item: IFileData, i: number) => {
      return this.uploaderRef!.preview
        ? (
          <div
            class='file-tools__core'
            onClick={() => {
              this.handleVideoPlay(item);
            }}
          >
            <el-icon size={20}>
              <video-play />
            </el-icon>
          </div>
        )
        : null;
    };
    // 删除
    const deleteIconRender = (item: IFileData, i: number) => {
      return !this.uploaderRef!.disabled && this.uploaderRef!.remove
        ? (
          <div class='file-tools__core' onClick={() => this.handleDel(i, item)}>
            <el-icon size={20}>
              <delete />
            </el-icon>
          </div>
        )
        : null;
    };
    // 下载
    const downloadIconRender = (item: IFileData, i: number) => {
      const name = item.name || item.url?.split('/')?.pop?.();
      return this.uploaderRef!.download
        ? (
          <div
            class='file-tools__core'
            onClick={() => this.handleDownload(item.url, name)}
          >
            <el-icon size={20}>
              <download />
            </el-icon>
          </div>
        )
        : null;
    };
    // 右移
    const nextIconRender = (item: IFileData, i: number) => {
      return (
        <div
          class='file-tools__point'
          onClick={() => this.handleMove(i !== this.list.length - 1 && !item.loading, i + 1, i, item)}
        >
          {
            !this.uploaderRef!.disabled && this.uploaderRef!.move && i !== this.list.length - 1
              ? (
                <el-icon size={20}>
                  {
                    this.uploaderRef.direction === 'row'
                      ? <arrow-right />
                      : <arrow-down />
                  }
                </el-icon>
              )
              : null
          }
        </div>
      );
    };

    // 图片预览
    const previewIconRender = (item: IFileData, i: number, treatAsImage: boolean, view: IScope['view']) => {
      return this.uploaderRef!.preview && treatAsImage
        ? (
          <div
            class='file-tools__core'
            onClick={() => {
              this.handlePreview(item, i, view);
            }}
          >
            <el-icon size={20}>
              <zoom-in />
            </el-icon>
          </div>
        )
        : null;
    };

    // 视频文件
    const videoItemRender = (item: IFileData, i: number) => {
      return (
        <div class={['file-item', 'video-item', fileWrapClassName]}>
          {
            uploadLoadingRender(item)
          }
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            class={[this.videoClassName, 'tw-object-cover']}
            key={item.url + i}
          >
            <source src={item.url} type='video/mp4' />
            <source src={item.url} type='video/quicktime' />
            <source src={item.url} type='video/ogg' />
            <source src={item.url} type='video/webm' />
            <object data={item.url}>
              <embed src={item.url} />
            </object>
          </video>
          <div class='file-item__mask' v-show={!item.loading}>
            {
              prevIconRender(item, i)
            }
            <div class='flex flex-wrap space-evenly'>
              {
                playIconRender(item, i)
              }
              {
                deleteIconRender(item, i)
              }
              {
                downloadIconRender(item, i)
              }
            </div>
            {
              nextIconRender(item, i)
            }
          </div>
        </div>
      );
    };

    return (
      <div>
        <VueDraggableNext v-model={this.selfList} class='file-list'>
          {
            this.$slots?.after?.()
          }
          {
            <>
              {this.list.length === 0 && this.uploaderRef.disabled ? (
                <el-image
                  class={['file-item', fileWrapClassName, 'tw-flex tw-items-center tw-justify-center']}
                  fit='contain'
                  src=''
                  v-slots={{
                    error: () => (
                      <div class='tw-w-100% tw-h-100% tw-flex tw-flex-center-xy tw-bg-[var(--el-bg-color)]'>
                        <div class='tw-text-12px tw-color-gray'>
                          <div>暂无数据</div>
                        </div>
                      </div>
                    ),
                  }}
                />
              ) : (
                this.list.map((item, i) => {
                  const isImage = isImageType(item);
                  // 视频文件
                  const isVideo = isVideoType(item);
                  if (isVideo) {
                    return videoItemRender(item, i);
                  }
                  return (
                    <image-viewer
                      class='file-item__viewer'
                      list={this.previewList}
                      v-slots={{
                        default: ({ view }: IScope) => {
                          return [
                            <div
                              class={['file-item', fileWrapClassName]}
                              key={item.url + i}
                              style={this.setFileWrapperStyle && this.setFileWrapperStyle(item, i)}
                            >
                              {
                                uploadLoadingRender(item)
                              }
                              {
                                isImage
                                  ? (
                                    <el-image
                                      class={this.imageClassName}
                                      fit='contain'
                                      src={this.getOssUrlSize(item, item.fake)}
                                    />
                                  )
                                  : item.name || item.url
                              }
                              <div class='file-item__mask' v-show={!item.loading}>
                                {
                                  prevIconRender(item, i)
                                }
                                <div class='flex flex-wrap space-evenly'>
                                  {
                                    previewIconRender(item, i, isImage, view)
                                  }
                                  {
                                    deleteIconRender(item, i)
                                  }
                                  {
                                    downloadIconRender(item, i)
                                  }
                                  {this.$slots?.['btn-block']?.({
                                    row: item,
                                    index: i,
                                  })}
                                </div>
                                {
                                  nextIconRender(item, i)
                                }
                              </div>
                            </div>,
                            this.$slots?.['list-item']?.({
                              data: item,
                              index: i,
                            }),
                          ];
                        },
                      }}
                    />
                  );
                })
              )}
            </>
          }
          {
            this.$slots?.prepend?.()
          }
        </VueDraggableNext>
        <VideoPlayDialog
          v-model={this.videoPlayData.visible}
          url={this.videoPlayData.url}
        />
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
@use './uploader' as *;
.space-evenly {
  justify-content: space-evenly;
}
.file-list {
  display: flex;
  // align-items: center;
  flex-wrap: wrap;
  .file-item__viewer {
    flex-direction: column;
    position: relative;
  }
  .file-item {
    float: left;
    position: relative;
    margin: 5px;
    overflow: hidden;
    border-radius: 6px;
    flex-shrink: 0;
    // align-items: center;
    // justify-content: center;
    line-height: 1.5em;
    .file-item__image, .file-item__video {
      width: 100%;
      height: 100%;
      :deep {
        .el-loading-mask {
          display: flex;
          align-items: center;
          .el-loading-spinner {
            position: static;
            margin-top: 0;
          }
        }
      }
      &--mini, &--tiny {
        :deep {
        .el-loading-mask {
          .el-loading-spinner {
            .circular {
              width: 28px;
              height: 28px;
            }
            .el-loading-text {
              font-size: 12px;
            }
          }
        }
      }
      }
    }
    &__medium {
      width: $sizeMediumHeight;
      height: $sizeMediumHeight;
    }
    &__small {
      width: $sizeSmall;
      height: $sizeSmall;
    }
    &__mini {
      width: $sizeMini;
      height: $sizeMini;
    }
    &__tiny {
      width: $tiny;
      height: $tiny;
    }
    &:hover {
      .file-item__mask {
        opacity: 1;
      }
      .video-item__mask {
        opacity: 0;
      }
    }
    .file-item__loading--dashboard {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 8;
      padding: 8px;
      justify-content: center;
      align-items: center;

      // &.mini {
      //   transform: scale(0.7);
      // }
      // &.tiny {
      //   transform: scale(0.4);
      // }
      :deep {
        .el-progress {
          width: 100%;
        }
        .el-progress__text {
          color: #4e6cef;
          // background: #ebeef5;
          // border-radius: 2px;
          min-width: 38px;
        }
      }
      &.mini, .tiny {
        :deep {
          .el-progress__text {
            font-size: 12px !important;
            min-width: 31px;
          }
        }
      }
    }
    .file-item__mask {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      align-items: center;
      justify-content: space-between;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: move;
      .file-tools__core {
        padding: 5px;
        margin: 0 3px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
        &:hover {
          opacity: 1;
        }
      }
      .file-tools__point {
        width: 30px;
        margin: 0;
        @extend .file-tools__core;
      }
    }
  }
  .video-item {
    outline: 1px solid #eee;
  }
}
</style>
