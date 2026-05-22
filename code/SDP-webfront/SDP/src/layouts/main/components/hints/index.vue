<template>
  <el-popover
    placement="bottom-start"
    :width="380"
  >
    <template #default>
      <el-scrollbar height="200px">
        <div v-if="myProcessingTaskObj.queueList.length">
          <div
            v-for="item in myProcessingTaskObj.queueList"
            :key="item.busId"
            class="tw-pb-10px tw-flex tw-flex-justify-between tw-flex-items-center"
          >
            <p>
              <span>{{ getLabelByVal(MY_TASK_TYPE_LIST, item.type) }}：</span>
              <!-- 花型提取 -->
              <router-link
                v-if="item.type === MY_TASK_TYPE_ENUM.FLOWER_PATTERN"
                :to="{
                  path: 'Webview',
                  query: {
                    domain: SYSTEM_ENUM.FASHION_DESIGN,
                    path: '/#/inspiration-center/flower-pattern-extraction/list',
                    query: JSON.stringify({
                      taskCode: item.busCode,
                    })
                  }
                }"
                target="_blank"
              >{{ item.busCode }}</router-link>
              <!-- AI设计详情 -->
              <router-link
                v-if="item.type === MY_TASK_TYPE_ENUM.AI_DESIGN"
                :to="{
                  // eslint-disable-next-line vue/max-len
                  name: `Webview`,
                  query: {
                    domain: SYSTEM_ENUM.FASHION_DESIGN,
                    path: `/#/inspiration-center/ai-design-task/detail/${item.taskId}`,
                    activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list'
                  }
                }"
                target="_blank"
              >{{ item.busCode }}</router-link>
            </p>
            <p class="tw-text-[12px]">
              <span
                v-if="item.estimateTime"
                :style="{
                  color: item.taskStatus === MY_TASK_STATUS_ENUM.GENERATING
                    ? 'var(--el-color-success)' : 'grey',
                }"
              >
                {{
                  item.taskStatus === MY_TASK_STATUS_ENUM.GENERATING
                    ? '生成中'
                    : `第${item.rankPosition}位`
                }}
              </span>
              <span class="text-color-grey">
                <template v-if="item.estimateTime">
                  预计{{
                    item.taskStatus === MY_TASK_STATUS_ENUM.GENERATING
                      ? `需要 ${diffDayText(item.estimateTime)}`
                      : `等待 ${diffDayText(item.estimateTime)}`
                  }}
                </template>
                <template v-else>
                  正在创建任务
                </template>
              </span>
            </p>
          </div>
        </div>
        <div class="tw-flex tw-flex-center-xy tw-py-50px" v-else>
          <empty description="暂无执行中任务" />
        </div>
      </el-scrollbar>
      <p class="tw-w-full tw-text-center" v-if="Number(myProcessingTaskObj.hide) > 0">
        剩余 {{ myProcessingTaskObj.hide }} 个任务
      </p>
    </template>
    <template #reference>
      <div class="tw-text-16px">
        <el-badge
          :value="badgeCount"
        >
          <img
            src="@/assets/renwu.png"
            class="tw-w28px tw-h28px"
          />
        </el-badge>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { 
  computed,
  // h,
  ref,
  onUnmounted
} from 'vue';
import { ElNotification } from 'element-plus';
import { getLabelByVal } from '@/core/plugins/filter';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RouteLocationResolvedGeneric, useRouter } from 'vue-router';
import { IProcessingListRes } from './api/type';
import { MY_TASK_TYPE_ENUM, MY_TASK_TYPE_LIST, MY_TASK_STATUS_ENUM } from './constant';
import { getMyCompletedTaskList, getMyProcessingTaskList } from './api';
import { SYSTEM_ENUM } from '@/core/http/env';

dayjs.extend(duration);
const $router = useRouter();

const diffDayText = (seconds: number | string) => {
  if (!seconds || seconds === '0') return '0min';
  const now = Date.now();
  const start = dayjs(now);
  const end = dayjs(now + Number(seconds) * 1000);

  const d = dayjs.duration(end.diff(start));

  const days = Math.floor(d.asDays());
  const hours = d.hours();
  const minutes = d.minutes();
  const s = d.seconds();

  return `${days ? `${days}d ` : ''}${hours ? `${hours}h` : ''}${minutes ? `${minutes}min` : ''}${s ? `${s}s` : ''}`;
};

const myProcessingTaskObj = ref<IProcessingListRes>({
  total: '0',
  hide: '0',
  show: '0',
  queueList: [],
});
const badgeCount = computed(() => {
  const t = Number(myProcessingTaskObj.value.total);
  let r = '';
  if (t > 0 && t < 99) {
    r = t.toString();
  } else if (t > 99) {
    r = '99+';
  }
  return r;
});

/**
 * 获取我的排队中、生成中的任务列表
 */
const getTaskProcessInfo = async () => {
  try {
    const { data } = await getMyProcessingTaskList();
    myProcessingTaskObj.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    pollProcessingTask();
  }
};

/**
 * 获取我的生成完成的任务列表
 */
const getFinishedTasks = async () => {
  try {
    // const { data } = await getMyCompletedTaskList();
    // if (!data.length) return;
    // for (let index = 0; index < data.length; index++) {
    //   setTimeout(() => {
    //     const finishedTasksItem = data[index];
    //     ElNotification({
    //       title: '任务完成',
    //       type: 'success',
    //       zIndex: 9999,
    //       position: 'bottom-right',
    //       customClass: 'tw-w-[370px]',
    //       message: h(
    //         'div',
    //         [
    //           `${getLabelByVal(MY_TASK_TYPE_LIST, finishedTasksItem.type)} ${finishedTasksItem.busCode} 已生成，`,
    //           h(
    //             'span',
    //             {
    //               style: 'color: #4d4ab7; cursor: pointer',
    //               onClick: () => {
    //                 let routeData: RouteLocationResolvedGeneric | undefined;
    //                 if (finishedTasksItem.type === MY_TASK_TYPE_ENUM.FLOWER_PATTERN) {
    //                   // 花型提取跳转到 列表&查询指定的taskCode的数据 InspirationCenterFlowerPatternExtractionList
    //                   routeData = $router.resolve({
    //                     path: 'Webview',
    //                     query: {
    //                       domain: SYSTEM_ENUM.FASHION_DESIGN,
    //                       path: '/#/inspiration-center/flower-pattern-extraction/list',
    //                       query: JSON.stringify({
    //                         taskCode: finishedTasksItem.busCode,
    //                       })
    //                     }
    //                   });
    //                   window.open(routeData.href, '_blank');
    //                 } else if (finishedTasksItem.type === MY_TASK_TYPE_ENUM.AI_DESIGN) {
    //                   // AI任务设计跳转到详情 InspirationCenterAIDesignTaskDetail
    //                   routeData = $router.resolve({
    //                     name: 'Webview',
    //                     query: {
    //                       domain: SYSTEM_ENUM.FASHION_DESIGN,
    //                       path: `/#/inspiration-center/ai-design-task/detail/${finishedTasksItem.taskId}`,
    //                       activeMenu: 'Webview?domain=fashion-design&path=/#/inspiration-center/ai-design-task/list'
    //                     }
    //                   });
    //                 }

    //                 if (!routeData) return;
    //                 window.open(routeData.href, '_blank');
    //               },
    //             },
    //             '点击查看',
    //           )
    //         ]
    //       ),
    //     });
    //   }, 10);
    // }
  } catch (e) {
    console.error(e);
  } finally {
    pollFinshedTask();
  }
};

let timer: any = null;
let finshedTaskTimer: any = null;
// 轮询任务
const pollProcessingTask = () => {
  timer = setTimeout(async () => {
    getTaskProcessInfo();
  }, 10000);
};

const pollFinshedTask = () => {
  finshedTaskTimer = setTimeout(async () => {
    getFinishedTasks();
  }, 10000);
};

const init = async () => {
  getTaskProcessInfo();
  getFinishedTasks();
};
init();

/** 隐藏页面时候，停止请求 */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    clearTimeout(timer);
    clearTimeout(finshedTaskTimer);
  }
  if (document.visibilityState === 'visible') {
    if (timer) {
      clearTimeout(timer);
    }
    if (finshedTaskTimer) {
      clearTimeout(finshedTaskTimer);
    }
    init();
  }
});

onUnmounted(() => {
  clearTimeout(timer);
  clearTimeout(finshedTaskTimer);
});

</script>
