<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, ref, computed } from 'vue';
import { getWebV1TechniqueGroupPageApi } from './api';
import type { getWebV1TechniqueGroupPageApiResListResItem } from './api/types';

export default defineComponent({
  name: 'TechniqueGroupSelect',
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    remote: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(_val: string | number | (string | number)[]) {
        emit('update:modelValue', _val);
      },
    });

    const loading = ref(false);
    const options = ref<getWebV1TechniqueGroupPageApiResListResItem[]>([]);

    const remoteMethod = async (query: string) => {
      if (!query) return;
      query = query.trim();
      try {
        loading.value = true;
        const { data } = await getWebV1TechniqueGroupPageApi({
          techniqueGroupName: query,
          isEnabled: '1',
          pageNum: '1',
          pageSize: '1000',
        });
        options.value = data.list || [];
      } finally {
        loading.value = false;
      }
    };

    return {
      value,
      loading,
      options,
      remoteMethod,
    };
  },
  render() {
    return (
      <el-select
        v-model={this.value}
        collapse-tags
        {...this.$props}
        clearable={this.clearable}
        filterable={this.filterable}
        remote={this.remote}
        loading={this.loading}
        remote-method={this.remoteMethod}
      >
        {
          this.options.map((item) => {
            return (
              <el-option
                key={item.techniqueGroupCode}
                value={item.techniqueGroupCode}
                label={item.techniqueGroupName}
              />
            );
          })
        }
      </el-select>
    );
  },
});
</script>
