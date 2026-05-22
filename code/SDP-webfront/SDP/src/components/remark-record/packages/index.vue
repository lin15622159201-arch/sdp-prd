<script lang="tsx">
import { pick } from 'lodash-es';
import RemarkMessage from './remark-message.vue';
import propsData from '../utils/props-data';
import remarkRecordDialog, { optsKeys } from './remark-record-dialog';
import { remarkRecordKey } from '../utils/token';
import { defineComponent, provide, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'RemarkRecord',
  components: {
    RemarkMessage,
  },
  props: propsData,
  emits: ['create', 'success'],
  setup(props, { emit }) {
    provide(
      remarkRecordKey,
      reactive({
        ...toRefs(props),
      }) as any
    );

    const handleRemarkRecord = () => {
      if (props.disabled) {
        return;
      }
      remarkRecordDialog.open(pick(props, optsKeys), {
        success(val) {
          emit('success', val);
        },
        create(val) {
          emit('create', val);
        },
      });
    };

    return {
      handleRemarkRecord,
    };
  },
  render() {
    return (
      <>
        <remark-message />
        {
          this.$slots?.prepend?.()
        }
        {
          !this.$props.disabled
            ? (
              <el-button text type='primary' onClick={this.handleRemarkRecord}>
                备注
              </el-button>
            )
            : null
        }
        {
          this.$slots?.append?.()
        }
      </>
    );
  },
});
</script>
