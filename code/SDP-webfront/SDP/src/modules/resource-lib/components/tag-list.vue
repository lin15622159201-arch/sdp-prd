<template>
  <el-form
    ref="formRef"
    inline
    :model="form"
    size="small"
    label-width="130px"
    class="fixed-el-form-item-height"
  >
    <!-- 标签列表 -->
    <el-form-item
      v-for="(tag, index) in form.tagSet"
      :key="index"
      :prop="`tagSet.${index}.next.code`"
      :label="`${tag.name}：`"
      :rules="tag.rules"
    >
      <el-select
        v-model="(tag.next as IClothingTag).code"
        style="width: 100%"
        clearable
      >
        <template
          v-for="(n, i) in tag.children"
          :key="i"
        >
          <el-option
            :label="(n as IClothingTag).name"
            :value="(n as IClothingTag).code"
            :disabled="(n as IClothingTag).status === '0'"
          />
        </template>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang='ts'>
import type { Ref, PropType } from 'vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import type { IClothingTag } from '../api/pattern/types';
import { getClothingTag } from '../api/pattern';

export default defineComponent({
  name: 'SearchForm',
  components: {
  },
  props: {
    collapse: {
      type: Boolean,
      require: true,
      default: false,
    },
    tags: {
      type: Array as PropType<IClothingTag[]>,
      require: false,
      default: () => [],
    },
    validateField: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const form = reactive({
      tagSet: [] as IClothingTag[],
    });
    const clothingTags: Ref<IClothingTag[]> = ref([]);
    const search = () => {
      emit('search', form);
    };

    const clearTagVal = (tag: IClothingTag) => {
      if (tag.next && (tag.next as any)?.code) {
        const hasCode = (tag.children as any[])?.some?.(item => item.code === (tag.next as any)!.code);
        if (!hasCode) {
          (tag.next as any).code = '';
          (tag.next as any).name = '';
        }
      }
    };
    const formRef = ref();
    // 获取标签列表
    const getTags = async () => {
      const res = await getClothingTag(false);
      // clothingTags.value = [];
      form.tagSet = [];
      clothingTags.value = [];
      // 创建数据结构
      res.data.forEach((tag: IClothingTag) => {
        //  COAT_STYLE:{ required: true, message: '请选择上身效果', trigger: 'change' },
        if (props.validateField.includes(tag.code)) {
          tag.rules = [
            { required: true, message: `${tag.name}不能为空`, trigger: 'blur' },
          ];
        } else {
          tag.rules = {};
        }
        form.tagSet?.push({
          code: tag.code,
          name: tag.name,
          next: { code: '' } as IClothingTag,
          children: tag.next,
          rules: tag.rules,
        });
      });
      // 数据匹配
      if (props.tags.length === 0) {
        return;
      }

      form.tagSet = form.tagSet.map((tag) => {
        props.tags.forEach((propsTag) => {
          const propsTagNext = propsTag.next as IClothingTag[];
          if (tag.code === propsTag.code && propsTagNext.length > 0) {
            [tag.next] = propsTagNext;
          }
        });

        clearTagVal(tag);
        return tag;
      });
    };
    const getTagsVal = () => {
      const tags = form.tagSet?.filter((tag: IClothingTag) => {
        if (tag.next && (tag.next as IClothingTag).code) {
          return true;
        }
        return false;
      });
      return tags;
    };
    const reset = () => {
      form.tagSet.forEach((item) => {
        const itemNext = item.next as IClothingTag;
        itemNext.code = '';
      });
      formRef.value.clearValidate();
    };

    const init = () => {
      getTags();
    };

    init();

    const resetFields = async () => {
      await formRef.value.resetFields();
      reset();
    };

    // 注意 props.tags 中的next是数组
    const matchData = () => {
      form.tagSet = form.tagSet.map((tag) => {
        props.tags.forEach((propsTag) => {
          const propsTagNext = propsTag.next as IClothingTag[];
          if (tag.code === propsTag.code && propsTagNext.length > 0) {
            [tag.next] = propsTagNext;
          }
        });

        clearTagVal(tag);
        return tag;
      });
    };
    watch(
      () => props.tags,
      () => {
        matchData();
      },
    );
    const validate = async () => {
      await formRef.value.validate();
    };
    return {
      validate,
      form,
      clothingTags,
      formRef,
      search,
      reset,
      getTagsVal,
      resetFields,
    };
  },
});
</script>
