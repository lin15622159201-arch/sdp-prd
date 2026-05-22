<script lang="tsx">
import { computed, defineComponent, ref, VNode, reactive } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import ImageViewer, { IScope } from '@/components/image-viewer';
import { Document, Loading, Close, Check, Download, ZoomIn, Delete, VideoPlay } from '@element-plus/icons-vue';
import useFileList from './hooks/use-file-list';
import type { PropType } from 'vue';
import type { IFileData, TSetFileWrapperStyle } from './types';
import useOssUlrSize from './hooks/use-oss-url-size';
import { file } from 'jszip';
import VideoPlayDialog from './video-play-dialog.vue';

export default defineComponent({
  name: 'TextFileList',
  components: {
    [Document.name as string]: Document,
    [Loading.name as string]: Loading,
    [Close.name as string]: Close,
    [Check.name as string]: Check,
    [Download.name as string]: Download,
    [ZoomIn.name as string]: ZoomIn,
    [Delete.name as string]: Delete,
    ImageViewer,
    VideoPlay
  },
  props: {
    list: {
      type: Array as PropType<IFileData[]>,
      default: () => ([]),
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
      handleDel,
      handlePreview,
      handleDownload,
    } = useFileList(props);

    const { getOssUrlSize } = useOssUlrSize();

    const uploaderSize = computed(() => {
      return uploaderRef.size;
    });

    // 是否视频文件
    const videoTypes = ['mp4', 'webm', 'ogg', 'mov'];
    const isVideoType = (obj: IFileData) => {
      const _type = obj.url?.split('.')?.pop()?.toLowerCase?.();
      return (_type && videoTypes.includes(_type)) || obj.type?.startsWith('video');
    };
    // 是否图片文件
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const isImageType = (obj: IFileData) => {
      const _type = obj.url?.split('.')?.pop()?.toLowerCase?.();
      return (_type && imageTypes.includes(_type)) || obj.type?.startsWith('image') || false;
    };

    // 图片文件混搭 list
    const mediaFileList = computed(() => {
      if (!props.showListTypeImg) {
        return props.list ?? [];
      }
      const pics: IFileData[] = [];
      const files: IFileData[] = [];
      props.list.forEach((v) => {
        if (isImageType(v) || isVideoType(v)) {
          pics.push(v);
        } else {
          files.push(v);
        }
      });
      return [...pics, ...files];
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
      videoPlayData,
      handleVideoPlay,
      uploaderRef,
      handleDel,
      handlePreview,
      handleDownload,
      activeIndex,
      getOssUrlSize,
      isImageType,
      isVideoType,
      mediaFileList,
      imageClassName: computed(() => {
        return ['text-file-item__image', `text-file-item__image--${uploaderSize.value}`].join(' ');
      }),
    };
  },
  render() {
    const downloadRender = (el: VNode | null, item: IFileData) => {
      if (this.uploaderRef.download) {
        return [
          <el-icon
            color='#605CE5'
            onClick={(evt: Event) => {
              evt.stopPropagation();
              const name = item.name || item.url?.split('/')?.pop?.();
              this.handleDownload(item.url, name);
            }}
          >
            <download />
          </el-icon>,
          el,
        ];
      }
      return el;
    };

    const previewRender = (item: IFileData) => {
      const isImg = this.isImageType(item);
      return (
        <>
          {
            this.uploaderRef.preview && isImg
              ? (
                <ImageViewer
                  list={[item]}
                  v-slots={{
                    default: ({ view }: IScope) => (
                      <el-icon
                        color='#909399'
                        onClick={() => this.handlePreview(item, 0, view)}
                      >
                        <ZoomIn />
                      </el-icon>
                    )
                  }}
                />
              ) : null
          }
        </>
      );
    };

    const iconRender = (item: IFileData, i: number) => {
      if (item.loading) {
        return (
          <>
            <span class='loading-text'>
              上传中...
              {item.progress}
              %
            </span>
            <el-icon color='#605CE5' class='loading-animation'>
              <loading />
            </el-icon>
          </>
        );
      }

      if (
        this.activeIndex === i
          && !this.uploaderRef!.disabled
          && this.uploaderRef!.remove
      ) {
        return downloadRender(
          <el-icon onClick={(evt: Event) => {
            evt.stopPropagation();
            this.handleDel(i, item);
          }}
          >
            <close />
          </el-icon>,
          item,
        );
      }

      return downloadRender(
        this.uploaderRef!.disabled ? null
          : (
            <el-icon color='#2DC873'>
              <check />
            </el-icon>
          ),
        item,
      );
    };
    const fileWrapClassName = `text-file-item__${this.uploaderRef!.size}`;

    return (
      <div>
        <VueDraggableNext v-model={this.$props.list} tag='ul'>
          {
            this.$slots?.prepend?.()
          }
          {
            this.mediaFileList.map((item, i) => {
              const isImg = this.isImageType(item);
              const isVideo = this.isVideoType(item);
              return (
                <>
                  {
                    this.$props.showListTypeImg && (isVideo || isImg)
                      ? (
                        <li
                          class={{
                            'text-file-image__list--item': true,
                            'flex-center': !!this.$slots['list-item'],
                          }}
                          style={this.setFileWrapperStyle && this.setFileWrapperStyle(item, i)}
                          key={i}
                          onMouseenter={() => {
                            this.activeIndex = i;
                          }}
                          onMouseleave={() => {
                            this.activeIndex = null;
                          }}
                          v-loading={item.loading}
                        >
                          <ImageViewer
                            class='text-file-item__viewer'
                            list={[item]}
                            v-slots={{
                              default: ({ view }: IScope) => (
                                <div
                                  class={['text-file-item', fileWrapClassName]}
                                >
                                  {item.loading && isVideo ? (
                                    // eslint-disable-next-line jsx-a11y/media-has-caption
                                    <video src={item.url} class='tw-w-100% tw-h-100% tw-object-cover' />
                                  ) : (
                                    <el-image
                                      class={this.imageClassName}
                                      fit='cover'
                                      src={this.getOssUrlSize(item)}
                                    />
                                  )}
                                  <div class='file-item__mask' v-show={!item.loading}>
                                    <div class='flex flex-wrap space-evenly'>
                                      {
                                        this.uploaderRef!.preview && isImg
                                          ? (
                                            <div
                                              class='file-tools__core'
                                              onClick={() => {
                                                this.handlePreview(item, 0, view);
                                              }}
                                            >
                                              <el-icon size={20}>
                                                <zoom-in />
                                              </el-icon>
                                            </div>
                                          )
                                          : null
                                      }
                                      {
                                        this.uploaderRef!.preview && isVideo
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
                                          : null
                                      }

                                      {
                                        !this.uploaderRef!.disabled && this.uploaderRef!.remove
                                          ? (
                                            <div class='file-tools__core' onClick={() => this.handleDel(i, item)}>
                                              <el-icon size={20}>
                                                <delete />
                                              </el-icon>
                                            </div>
                                          )
                                          : null
                                      }
                                      {
                                        this.uploaderRef!.download
                                          ? (
                                            <div
                                              class='file-tools__core'
                                              onClick={() => this.handleDownload(item.url, item.name)}
                                            >
                                              <el-icon size={20}>
                                                <download />
                                              </el-icon>
                                            </div>
                                          )
                                          : null
                                      }
                                    </div>
                                  </div>
                                </div>
                              )
                            }}
                          />
                        </li>
                      ) : (
                        <li
                          class={{
                            'text-file__list': true,
                            'tw-relative': true,
                            'flex-center': !!this.$slots['list-item'],
                          }}
                          style={this.setFileWrapperStyle && this.setFileWrapperStyle(item, i)}
                          key={i}
                          onMouseenter={() => {
                            this.activeIndex = i;
                          }}
                          onMouseleave={() => {
                            this.activeIndex = null;
                          }}
                        >
                          <div
                            class='text-file__list--name'
                            onClick={() => {
                              this.handlePreview(item, i);
                            }}
                          >
                            <el-icon color='#909399' class='icon-document'>
                              <document />
                            </el-icon>
                            {item.name || item.url}
                          </div>
                          <div class='text-file__list--label'>
                            {
                              previewRender(item)
                            }
                            {
                              iconRender(item, i)
                            }
                          </div>
                          {
                            this.$slots['list-item']?.({
                              data: item,
                              index: i,
                            })
                          }
                        </li>
                      )
                  }
                </>
              );
            })
          }
          {
            this.$slots?.after?.()
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
@import './uploader';
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-animation {
  animation: loading 2s linear infinite;
}
.loading-text {
  color: #4F5CF5;
  font-size: 12px;
}
.text-file {
  &__list {
    position: relative;
    width: 100%;
    cursor: move;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    font-size: 14px;
    color: #909399;
    line-height: 1.8;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    // overflow: hidden;
    &.flex-center {
      display: flex;
      align-items: center;
    }
    &--name {
      display: flex;
      align-items: center;
      width: calc(100% - 40px);
      color: #606266;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      cursor: pointer;
      flex-shrink: 0;
      // white-space: nowrap;
      .icon-document {
        margin-right: 7px;
        height: 100%;
        color: #909399;
      }
    }
    &--label {
      display: flex;
      position: absolute;
      top: 50%;
      right: 5px;
      line-height: inherit;
      cursor: pointer;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transform: translateY(-50%);
      i {
        padding: 5px;
      }
    }
    &:hover {
      background: #f5f7fa;
    }
  }
}

// 图片
.text-file-image__list--item {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
  font-size: 14px;
  color: #909399;
  line-height: 1.8;
  box-sizing: border-box;
  border-radius: 4px;
  vertical-align: middle;
  .text-file-item {
    float: left;
    position: relative;
    margin: 5px;
    overflow: hidden;
    border-radius: 6px;
    flex-shrink: 0;
    line-height: 1.5em;
    .text-file-item__image {
      width: 100%;
      height: 100%;
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
    }

    // mask
    .file-item__mask {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: pointer;
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
}
</style>
