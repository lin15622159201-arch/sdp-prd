<template>
  <div>
    <div class="tw-flex tw-flex-wrap">
      <section>
        <uploader
          v-if="!disabled || frontListProxy.length"
          v-model="frontListProxy"
          :size="size"
          :limit="1"
          accept="image/png, image/jpg, image/jpeg"
          :check-accept="true"
          list-position="prepend"
          :set-file-wrapper-style="handleFileWrapperStyle"
          :disabled="disabled"
        >
          <template v-if="!disabled" #list-item="{ data }">
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.SUCCESS" class="status-icon status-icon__success">
              <CircleCheck />
            </el-icon>
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.FAIL" class="status-icon status-icon__fail">
              <CircleClose />
            </el-icon>
          </template>
          <template #under>
            <div class="tag-wrapper" :class="`tag-wrapper__${size}`">
              <el-tag>
                正面
              </el-tag>
            </div>
          </template>
        </uploader>
      </section>
      <section>
        <uploader
          v-if="!disabled || sideListProxy.length"
          v-model="sideListProxy"
          :size="size"
          :limit="1"
          accept="image/png, image/jpg, image/jpeg"
          :check-accept="true"
          list-position="prepend"
          :set-file-wrapper-style="handleFileWrapperStyle"
          :disabled="disabled"
        >
          <template v-if="!disabled" #list-item="{ data }">
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.SUCCESS" class="status-icon status-icon__success">
              <CircleCheck />
            </el-icon>
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.FAIL" class="status-icon status-icon__fail">
              <CircleClose />
            </el-icon>
          </template>
          <template #under>
            <div class="tag-wrapper" :class="`tag-wrapper__${size}`">
              <el-tag>
                侧面
              </el-tag>
            </div>
          </template>
        </uploader>
      </section>
      <section>
        <uploader
          v-if="!disabled || backListProxy.length"
          v-model="backListProxy"
          :size="size"
          :limit="1"
          accept="image/png, image/jpg, image/jpeg"
          :check-accept="true"
          list-position="prepend"
          :set-file-wrapper-style="handleFileWrapperStyle"
          :disabled="disabled"
        >
          <template v-if="!disabled" #list-item="{ data }">
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.SUCCESS" class="status-icon status-icon__success">
              <CircleCheck />
            </el-icon>
            <el-icon v-if="data.validateStatus === VALIDATE_STATUS.FAIL" class="status-icon status-icon__fail">
              <CircleClose />
            </el-icon>
          </template>
          <template #under>
            <div class="tag-wrapper" :class="`tag-wrapper__${size}`">
              <el-tag>
                背面
              </el-tag>
            </div>
          </template>
        </uploader>
      </section>
      <section v-if="otherProp === 'other'">
        <uploader
          v-if="!disabled || otherListProxy.length"
          v-model="otherListProxy"
          :size="size"
          :limit="15"
          accept="image/png, image/jpg, image/jpeg"
          :check-accept="true"
          list-position="prepend"
          :disabled="disabled"
        >
          <template #under>
            <div class="tag-wrapper" :class="`tag-wrapper__${size}`">
              <el-tag>
                其他图
              </el-tag>
            </div>
          </template>
        </uploader>
      </section>
      <section v-if="otherProp === 'detail'">
        <uploader
          v-if="!disabled || detailListProxy.length"
          v-model="detailListProxy"
          :size="size"
          :limit="15"
          accept="image/png, image/jpg, image/jpeg"
          :check-accept="true"
          list-position="prepend"
          :disabled="disabled"
        >
          <template #under>
            <div class="tag-wrapper" :class="`tag-wrapper__${size}`">
              <el-tag>
                其他图
              </el-tag>
            </div>
          </template>
        </uploader>
      </section>
    </div>
    <section
      v-if="
        !disabled && displayFailMsg && pictureList.length
          && pictureList.some(picture => picture.validateStatus === VALIDATE_STATUS.FAIL)
      "
      class="fail-hint-section"
    >
      <div>错误提示：</div>
      <div class="fail-hint-wrapper">
        <p
          v-for="item in getErrorList()"
          :key="item.url"
        >
          {{ `【${$filters.getEnumLabel(PICTURE_ANGLE_LIST, item.angle)}】` }}{{ item.failMsg }}
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
// import { errorHandler } from '@tiangong/errors';
import type { PropType } from 'vue';
import type { IFileData } from '@/components/uploader/packages/types';
import type { IFileExt } from './types';
import {
  PICTURE_ANGLE,
  VALIDATE_STATUS,
  PICTURE_ANGLE_LIST,
} from './types';
import {
  apiLaunchValidateTask,
  apiCheckValidateTaskResult,
} from './api';
import type { IReqBodyPoseCheckRes } from './api/types';
import { ElMessage, ElMessageBox } from 'element-plus';
import { CircleCheck, CircleClose } from '@element-plus/icons-vue';
import { YES_NO_NUMBER_ENUM, YES_NO_ENUM } from '@/constant';
// import type { IResponse } from '@/core/http/type';

const props = defineProps({
  modelValue: {
    type: Array as PropType<IFileExt[]>,
    default: () => [],
  },
  relatedDesignCode: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: String as PropType<'medium' | 'small' | 'mini' | 'tiny'>,
    viladator: (val: string) => {
      return ['medium', 'small', 'mini', 'tiny'].includes(val);
    },
    default: 'mini',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayFailMsg: {
    type: Boolean,
    default: true,
  },
  displayValidateRequirement: {
    type: Boolean,
    default: true,
  },
  otherProp: {
    type: String as PropType<'other' | 'detail'>,
    default: 'other',
  },
});

const emit = defineEmits([
  'update:modelValue',
]);
// const {
//   modelValue: pictureList,
// } = toRefs(props);
const pictureList = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
const frontListProxy = computed({
  get() {
    return pictureList.value.filter((item) => {
      item.validateStatus = item.validateStatus ?? VALIDATE_STATUS.SILENCE;
      return item.angle === PICTURE_ANGLE.FRONT;
    });
  },
  set(newValue) {
    // eslint-disable-next-line vue/max-len
    pictureList.value = pictureList.value.filter(item => item.angle !== PICTURE_ANGLE.FRONT).concat(newValue.map((item) => {
      return {
        ...item,
        angle: PICTURE_ANGLE.FRONT,
      };
    }));
  },
});
const sideListProxy = computed({
  get() {
    return pictureList.value.filter((item) => {
      item.validateStatus = item.validateStatus ?? VALIDATE_STATUS.SILENCE;
      return item.angle === PICTURE_ANGLE.SIDE;
    });
  },
  set(newValue) {
    // eslint-disable-next-line vue/max-len
    pictureList.value = pictureList.value.filter(item => item.angle !== PICTURE_ANGLE.SIDE).concat(newValue.map((item) => {
      return {
        ...item,
        angle: PICTURE_ANGLE.SIDE,
      };
    }));
  },
});
const backListProxy = computed({
  get() {
    return pictureList.value.filter((item) => {
      item.validateStatus = item.validateStatus ?? VALIDATE_STATUS.SILENCE;
      return item.angle === PICTURE_ANGLE.BACK;
    });
  },
  set(newValue) {
    // eslint-disable-next-line vue/max-len
    pictureList.value = pictureList.value.filter(item => item.angle !== PICTURE_ANGLE.BACK).concat(newValue.map((item) => {
      return {
        ...item,
        angle: PICTURE_ANGLE.BACK,
      };
    }));
  },
});
const otherListProxy = computed({
  get() {
    return pictureList.value.filter((item) => {
      item.validateStatus = item.validateStatus ?? VALIDATE_STATUS.SILENCE;
      return item.angle === PICTURE_ANGLE.OTHER;
    });
  },
  set(newValue) {
    // eslint-disable-next-line vue/max-len
    pictureList.value = pictureList.value.filter(item => item.angle !== PICTURE_ANGLE.OTHER).concat(newValue.map((item) => {
      return {
        ...item,
        angle: PICTURE_ANGLE.OTHER,
      };
    }));
  },
});

const detailListProxy = computed({
  get() {
    return pictureList.value.filter((item) => {
      item.validateStatus = item.validateStatus ?? VALIDATE_STATUS.SILENCE;
      return item.angle === PICTURE_ANGLE.DETAIL;
    });
  },
  set(newValue) {
    // eslint-disable-next-line vue/max-len
    pictureList.value = pictureList.value.filter(item => item.angle !== PICTURE_ANGLE.DETAIL).concat(newValue.map((item) => {
      return {
        ...item,
        angle: PICTURE_ANGLE.DETAIL,
      };
    }));
  },
});

const hasFruitlessChecker = (list: IFileExt[]) => {
  return list.filter(item => ![VALIDATE_STATUS.SUCCESS, VALIDATE_STATUS.FAIL].includes(item.validateStatus));
};
let pollingLaunchTimer: ReturnType<typeof setTimeout>;
interface IPollingLaunchFunc {
  // (pictureItem: IFileExt, delay?: number): Promise<IResponse<IReqBodyPoseCheckRes>>;
  (pictureItem: IFileExt, delay?: number): Promise<any>;
}
const pollingLaunch: IPollingLaunchFunc = async (pictureItem: IFileExt, delay = 3000) => {
  pictureItem.launchCount = pictureItem.launchCount ?? 0;
  return new Promise((resolve, reject) => {
    if (pictureItem.launchCount > 8) {
      reject();
    } else {
      apiLaunchValidateTask({
        tasks: [
          {
            id: pictureItem.url,
            url: pictureItem.url,
            extra: {
              skc: props.relatedDesignCode,
              orientation: pictureItem.angle,
            },
          },
        ],
      }).then((res) => {
        if (res?.data?.code === '0') {
          resolve(res);
        } else {
          pollingLaunchTimer = setTimeout(() => {
            pictureItem.launchCount += 1;
            resolve(pollingLaunch(pictureItem, delay));
          }, delay);
        }
      }).catch((_) => {
        pollingLaunchTimer = setTimeout(() => {
          pictureItem.launchCount += 1;
          resolve(pollingLaunch(pictureItem, delay));
        }, delay);
      });
    }
  });
};

let pollingValidateTimer: ReturnType<typeof setTimeout>;
const pollingValidate = (delay = 3000) => {
  const fruitlessPictureList = hasFruitlessChecker(pictureList.value);
  if (!fruitlessPictureList.length) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    apiCheckValidateTaskResult({
      tasks: fruitlessPictureList.map((pictureItem) => {
        return {
          id: pictureItem.url,
        };
      }),
    }).then((res) => {
      if (res?.data?.tasks?.length) {
        res.data.tasks.forEach((taskResultItem) => {
          const targetItem = pictureList.value.find((pictureItem) => {
            return pictureItem.url === taskResultItem.id;
          });
          if (targetItem) {
            if (taskResultItem.aiRes && Number(taskResultItem.aiRes?.code) < 0) {
              targetItem.validateStatus = VALIDATE_STATUS.FAIL;
              targetItem.failMsg = '读取图片失败';
            } else {
              if (taskResultItem.aiRes && taskResultItem.aiRes.resData?.length
              && taskResultItem.aiRes.resData?.every(item => item.checkPass === YES_NO_ENUM.YES)
              ) {
                targetItem.validateStatus = VALIDATE_STATUS.SUCCESS;
              }
              if (taskResultItem.aiRes && taskResultItem.aiRes.resData?.length
              && taskResultItem.aiRes.resData?.some(item => item.checkPass === YES_NO_ENUM.NO)
              ) {
                targetItem.validateStatus = VALIDATE_STATUS.FAIL;
                targetItem.failMsg = taskResultItem.aiRes?.msg;
              }
            }
          }
        });
      }
      if (pictureList.value.length
        && pictureList.value.some(item => ![VALIDATE_STATUS.SUCCESS, VALIDATE_STATUS.FAIL].includes(item.validateStatus)
        // eslint-disable-next-line vue/max-len
        && ((props.otherProp === 'other' && item.angle !== PICTURE_ANGLE.OTHER) || (props.otherProp === 'detail' && item.angle !== PICTURE_ANGLE.DETAIL)))
      ) {
        pollingValidateTimer = setTimeout(() => {
        // pictureItem.launchCount = pictureItem.launchCount + 1;
          resolve(pollingValidate(delay));
        }, delay);
      }
      resolve('');
    }).catch((_) => {
      pollingValidateTimer = setTimeout(() => {
        // pictureItem.launchCount = pictureItem.launchCount + 1;
        resolve(pollingValidate(delay));
      }, delay);
    }).finally(() => {});
  });
};
const handlePollingLaunch = () => {
  pictureList.value.filter((picture) => {
    // eslint-disable-next-line vue/max-len
    return (!picture.validateStatus || picture.validateStatus === VALIDATE_STATUS.SILENCE) && ((props.otherProp === 'other' && picture.angle !== PICTURE_ANGLE.OTHER) || (props.otherProp === 'detail' && picture.angle !== PICTURE_ANGLE.DETAIL));
  }).forEach(async (item) => {
    try {
      const res = await pollingLaunch(item);
      if (res?.data?.code === '0') {
        item.validateStatus = VALIDATE_STATUS.PENDING;
        pollingValidate();
      } else {
        item.validateStatus = VALIDATE_STATUS.SILENCE;
      }
    } catch (err) {
      // errorHandler.handleError(err);
      ElMessage.warning('校验服务发起失败，请刷新后重试');
    }
  });
};

const getErrorList = () => {
  // eslint-disable-next-line vue/max-len
  return pictureList.value.filter(item => item.validateStatus === VALIDATE_STATUS.FAIL && ((props.otherProp === 'other' && item.angle !== PICTURE_ANGLE.OTHER) || (props.otherProp === 'detail' && item.angle !== PICTURE_ANGLE.DETAIL)));
};

// watch(() => pictureList.value, (newValue, oldValue) => {
//   if (props.disabled || !newValue.length || !hasFruitlessChecker(newValue)?.length) return;
//   if (newValue.length > oldValue.length) {
//     handlePollingLaunch();
//   }
// }, { deep: true });

onMounted(() => {
  // if (!props.disabled) {
  //   handlePollingLaunch();
  // }
});

onUnmounted(() => {
  clearTimeout(pollingLaunchTimer);
  clearTimeout(pollingValidateTimer);
});

const handleFileWrapperStyle = (itemData: IFileData) => {
  if (props.disabled) {
    return null;
  }
  const borderColor: Record<VALIDATE_STATUS, string> = {
    [VALIDATE_STATUS.SUCCESS]: '#67C23A',
    [VALIDATE_STATUS.FAIL]: '#F56C6C',
    [VALIDATE_STATUS.PENDING]: '#E6A23C',
    [VALIDATE_STATUS.SILENCE]: '#E6A23C',
  };
  if ([VALIDATE_STATUS.SUCCESS, VALIDATE_STATUS.FAIL].includes((itemData as unknown as IFileExt).validateStatus)) {
    return {
      border: `2px solid ${borderColor[(itemData as unknown as IFileExt).validateStatus]}`,
    };
  }
  return null;
};
const submitValidate = async (shouldSecondaryConfirm = true) => {
  if (!frontListProxy.value.length) {
    ElMessage.warning('缺少 正面 样衣图');
    return {
      isPass: false,
      isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
    };
  }
  if (!sideListProxy.value.length) {
    ElMessage.warning('缺少 侧面 样衣图');
    return {
      isPass: false,
      isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
    };
  }
  if (!backListProxy.value.length) {
    ElMessage.warning('缺少 背面 样衣图');
    return {
      isPass: false,
      isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
    };
  }
  // eslint-disable-next-line vue/max-len
  if (pictureList.value.some(item => ![VALIDATE_STATUS.SUCCESS, VALIDATE_STATUS.FAIL].includes(item.validateStatus) && ((props.otherProp === 'other' && item.angle !== PICTURE_ANGLE.OTHER) || (props.otherProp === 'detail' && item.angle !== PICTURE_ANGLE.DETAIL)))) {
    // ElMessage.warning('存在未校验样衣图，请待所有图片校验后重试');
    // return {
    //   isPass: false,
    //   isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
    // };
    try {
      // await ElMessageBox.confirm(
      //   '存在未校验样衣图，是否强制通过？',
      //   '二次确认',
      //   {
      //     confirmButtonText: '是',
      //     cancelButtonText: '否',
      //     type: 'warning',
      //   },
      // );
      return {
        isPass: true,
        isEnforcePassPicture: YES_NO_NUMBER_ENUM.YES,
      };
    } catch (_) {
      return {
        isPass: false,
        isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
      };
    }
  }
  // eslint-disable-next-line vue/max-len
  if (pictureList.value.some(item => [VALIDATE_STATUS.FAIL].includes(item.validateStatus) && ((props.otherProp === 'other' && item.angle !== PICTURE_ANGLE.OTHER) || (props.otherProp === 'detail' && item.angle !== PICTURE_ANGLE.DETAIL))) && shouldSecondaryConfirm) {
    try {
      await ElMessageBox.confirm(
        '存在样衣图片上传不合格，是否强制通过？',
        '二次确认',
        {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        },
      );
      return {
        isPass: true,
        isEnforcePassPicture: YES_NO_NUMBER_ENUM.YES,
      };
    } catch (_) {
      return {
        isPass: false,
        isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
      };
    }
  }
  return {
    isPass: true,
    isEnforcePassPicture: YES_NO_NUMBER_ENUM.NO,
  };
};

defineExpose({
  submitValidate,
});
</script>

<style lang="scss" scoped>
@import '@/components/uploader/packages/uploader.scss';
.tag-wrapper{
  // text-align: center;
  padding-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &__medium {
    width: calc($sizeMedium + 10px);
  }
  &__small {
    width: calc($sizeSmall + 10px);
  }
  &__mini {
    width: calc($sizeMini + 10px);
  }
  &__tiny {
    width: calc($tiny + 10px);
  }
}
.status-icon{
  position: absolute;
  top: 7px;
  right: 7px;
  &__success{
    color: #67C23A;
  }
  &__fail{
    color: #F56C6C;
  }
}
.fail-hint-section{
  display: flex;
  margin-top: 12px;
  .fail-hint-wrapper{
    p{
      line-height: 1.5;
    }
  }
}
.requirement-section {
  display: flex;
  margin-top: 12px;
  .requirement-wrapper {
    color: #F56C6C;
    p {
      line-height: 1.5;
    }
  }
}
</style>
