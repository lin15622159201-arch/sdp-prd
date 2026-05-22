<template>
  <div class="address-index-con">
    <el-row>
      <!--省-->
      <el-col
        :span="span[0]"
        v-if="showType[0] === 'province'"
      >
        <el-form-item
          :prop="propList[0]"
          :style="{ marginRight: `${gutter}px` }"
          :rules="[{ required: !!propList[0], message: '请选择省！', trigger: 'change' }]"
        >
          <el-select
            v-model="provinceVal"
            placeholder="请选择省"
            @change="provinceChange"
            clearable
            filterable
            :disabled="disabled"
            class="select-full"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.code"
              :label="item.provinceName"
              :value="item.provinceName"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <!--市-->
      <el-col
        :span="span[1]"
        v-if="showType[1] === 'city'"
      >
        <el-form-item
          :prop="propList[1]"
          :style="{ marginRight: `${gutter}px` }"
          :rules="[{ required: !!propList[1], message: '请选择市！', trigger: 'change' }]"
        >
          <el-select
            v-model="cityVal"
            placeholder="请选择市"
            @change="cityChange"
            clearable
            filterable
            :disabled="disabled"
            class="select-full"
          >
            <el-option
              v-for="item in cityList"
              :key="item.code"
              :label="item.cityName"
              :value="item.cityName"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <!--区-->
      <el-col
        :span="span[2]"
        v-if="showType[2] === 'area'"
      >
        <el-form-item
          :prop="propList[2]"
          :rules="[{ required: !!propList[2], message: '请选择区！', trigger: 'change' }]"
        >
          <el-select
            v-model="areaVal"
            placeholder="请选择区"
            @change="areaChange"
            clearable
            filterable
            :disabled="disabled"
            class="select-full"
          >
            <el-option
              v-for="item in areaList"
              :key="item.code"
              :label="item.areaName"
              :value="item.areaName"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
/*
 * 说明：省-市-区业务显示组件；
 * 功能：自由选择显示、支持回填显示、自定义间隔及宽度比例、支持表单校验、支持自动选择下级地址、
 *       支持值改变回调方法如下：
 * provinceChange：省改变时；
 * cityChange：市改变时；
 * areaChange：区改变时;
 * change:省-市-区其中一个改变时；
 * processProvinceList 自定义处理省数据列表 函数返回省数据列表
 * 作者：min-liao;
 * */

import { getAreaTree } from '@/api/open';
import { defineComponent, ref, watch, PropType } from 'vue';

export default defineComponent({
  name: 'AddressPicker',
  props: {
    disabled: {
      // 禁用状态
      type: Boolean,
      default: false,
    },

    showType: {
      // 省-市-区显示组合规则；
      type: Array,
      default: () => {
        return ['province', 'city', 'area'];
      },
    },

    gutter: {
      // 间隔；
      type: Number,
      default: 8,
    },

    span: {
      // 省-市-区宽度比例控制；（总为：24）；
      type: Array as PropType<number[]>,
      default: () => {
        return [8, 8, 8];
      },
    },

    propList: {
      // 是否需要检查的字段(数组里传引用表单里省-市-区的字段名字, 为空数组时不校验)；
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      },
    },

    automatic: {
      // 是否自动选择下级地区（默认选择第一个）；
      type: Boolean,
      default: false,
    },

    province: {
      type: String,
      default: '',
    },

    city: {
      type: String,
      default: '',
    },

    area: {
      type: String,
      default: '',
    },

    // 自定义处理省数据
    processProvinceList: {
      type: Function,
    },
  },

  emits: ['update:province', 'update:city', 'update:area', 'change', 'provinceChange', 'cityChange', 'areaChange'],
  setup(props, { emit }) {
    const provinceVal = ref('');
    const cityVal = ref('');
    const areaVal = ref('');

    const provinceList = ref<any[]>([]);
    const cityList = ref<any[]>([]);
    const areaList = ref<any>([]);
    const totalData = ref<any[]>([]);

    // 获取当前省下的市列表；
    const getCityList = () => {
      const itemObj: any = provinceList.value.find((item) => {
        return item.provinceName === provinceVal.value;
      });
      cityList.value = itemObj ? itemObj.cities : [];
      if (props.automatic && !cityVal.value && cityList.value.length !== 0) {
        cityVal.value = cityList.value[0].cityName;
      }
    };

    // 获取当前市下的区列表；
    const areaCityList = () => {
      const itemObj = cityList.value.find((item) => {
        return item.cityName === cityVal.value;
      });
      areaList.value = itemObj ? itemObj.areas : [];
      if (props.automatic && !areaVal.value && areaList.value.length !== 0) {
        areaVal.value = areaList.value[0].areaName;
      }
    };

    // 省改变时；
    const provinceChange = () => {
      cityVal.value = '';
      areaVal.value = '';
      getCityList();
      areaCityList();
      totalData.value = [provinceVal.value, cityVal.value, areaVal.value];
      emit('update:province', provinceVal.value);
      emit('update:city', cityVal.value);
      emit('update:area', areaVal.value);

      emit('provinceChange', provinceVal.value);
      emit('change', totalData.value);
    };

    // 市改变时；
    const cityChange = () => {
      areaVal.value = '';
      areaCityList();
      totalData.value = [provinceVal.value, cityVal.value, areaVal.value];
      emit('update:city', cityVal.value);
      emit('update:area', areaVal.value);

      emit('cityChange', cityVal.value);
      emit('change', totalData.value);
    };

    // 区改变时；
    const areaChange = () => {
      totalData.value = [provinceVal.value, cityVal.value, areaVal.value];
      emit('update:area', areaVal.value);

      emit('areaChange', areaVal.value);
      emit('change', totalData.value);
    };

    watch(
      () => props.province,
      (newVal) => {
        provinceVal.value = newVal;
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.city,
      (newVal) => {
        cityVal.value = newVal;
        if (cityVal.value && cityList.value.length === 0) {
          getCityList();
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.area,
      (newVal) => {
        areaVal.value = newVal;
        if (areaVal.value && areaList.value.length === 0) {
          areaCityList();
        }
      },
      {
        immediate: true,
      },
    );

    // 获取省市区数据集合；
    const getDataList = () => {
      getAreaTree({
        t: Date.now(),
      })
        .then((res: any) => {
          const data = res?.data || [];
          provinceList.value = props.processProvinceList ? props.processProvinceList(data) : data;
          getCityList();
          areaCityList();
        })
        .catch(() => {});
    };
    getDataList();

    return {
      provinceVal,
      cityVal,
      areaVal,
      provinceList, // 省列表；
      cityList, // 市列表；
      areaList, // 区列表；
      totalData, // 省-市-区会总；
      provinceChange,
      cityChange,
      areaChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.address-index-con {
  :deep(.el-form-item) {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }
}
</style>
