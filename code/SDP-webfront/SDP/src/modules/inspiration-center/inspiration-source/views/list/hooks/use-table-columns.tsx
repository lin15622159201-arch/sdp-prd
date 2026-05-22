import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTableColumns } from '@toy/business-components';
import { ITableItem } from '../type';
import { resizeImgByWidth } from '@/core/utils/helper';
import { useEditPhotoDialog } from '@/components/use-edit-photo-dialog';
import {
  IDENTIFY_STATUS_LIST,
  SUBMIT_STATUS_LIST,
  SUBMIT_STATUS_ENUM,
} from '@/modules/inspiration-center/inspiration-source/constant';
import { filters } from '@/core/plugins/filter';
import { usePermissionConfig } from '../../../use-permission-config';
import { useOpenBlank } from '@/hooks-transfer/use-router-blank';
import './style.scss';
import { InspirationEditCategoryReqItem } from '../../../api/type';

export interface IConfig {
  tableData: Ref<ITableItem[]>;
  handleSuccess?: () => void;
  handleSubmit: (id: string, item: ITableItem) => void;
  inspirationEditImageApiFun:(data: any) => void;
  editorIdentifieCcategoriesFun: (id: string) => void;
}
export const useListColumns = ({ tableData, handleSubmit, inspirationEditImageApiFun, editorIdentifieCcategoriesFun }: IConfig) => {
  const { TJRW, LGRWXQ, BJSBPL } = usePermissionConfig();
  const router = useRouter();
  const handleCheck = (id: string) => {
    const { href } = router.resolve({
      name: 'InspirationCenterInspirationSourceDetail',
      params: { id },
    });
    useOpenBlank(href);
  };
  const form = ref<InspirationEditCategoryReqItem>({
    categoryName: '',
    categoryCode: '',
    inspirationId: ''
  });
  const editorIdentifieCcategories = (id: string, category: string) => {
    form.value.categoryName = category;
    editorIdentifieCcategoriesFun(id);
  };
  const checkAll = ref(false);
  const isIndeterminate = ref(false);

  const handleCheckAllChange = (val: boolean) => {
    tableData.value.forEach((i) => {
      i.isSelect = val;
    });
    isIndeterminate.value = false;
  };

  const handCheckChange = () => {
    const count = tableData.value.filter(i => i.isSelect).length;
    checkAll.value = count === tableData.value.length;
    isIndeterminate.value = count > 0 && count < tableData.value.length;
  };
  const inspirationId = ref<string>('');
  const { handleOpenDialog: handleOpenEditPhotoDialog } = useEditPhotoDialog({
    handleSuccess(url) {
      inspirationEditImageApiFun({
        url,
        inspirationId: inspirationId.value,
      });
    }
  });
  

  const { columns } = useTableColumns<ITableItem>(() => {
    return [
      {
        label: '',
        width: '40',
        fixed: 'left',
        render(row) {
          return (
            <el-checkbox v-model={row.isSelect} onChange={() => handCheckChange()} />
          );
        },
        renderHeader() {
          return (
            <el-checkbox
              v-model={checkAll.value}
              indeterminate={isIndeterminate.value}
              onChange={(val: boolean) => handleCheckAllChange(val)}
            />
          );
        },
      },
      {
        label: '企划来源',
        minWidth: '120',
        prop: 'planSource',
      },
      {
        label: '波次',
        minWidth: '120',
        prop: 'waves',
      },
      {
        label: '灵感编号',
        minWidth: '120',
        prop: 'inspirationCode',
      },
      {
        label: '灵感图',
        minWidth: '120',
        render(row) {
          if (!row.inspirationImg && row.dataSource !== '导入') return null;
          return (
            <div class='tw-flex tw-flex-wrap tw-gap-2px'>
              <div class='img-look-eith-box'>
                {row.inspirationImg && (
                  <el-button
                    class='bth-pro'
                    type='primary'
                    onClick={() => {
                      inspirationId.value = row.id;
                      handleOpenEditPhotoDialog({ url: row.inspirationImg });
                    }}
                  >
                    编辑图片
                  </el-button>
                )}
                <el-image
                  src={resizeImgByWidth(row.inspirationImg, 200)}
                  className='tw-w-100px tw-h-100px tw-rounded-4px'
                  fit='cover'
                  preview-src-list={[row.inspirationImg]}
                  preview-teleported
                />
              </div>
            </div>
          );
        }
      },
      {
        label: '外部品类',
        minWidth: '120',
        prop: 'outCategory',
      },
      {
        label: '灵感图来源',
        minWidth: '120',
        prop: 'inspirationImageSource',
      },
      // {
      //   label: '灵感图品牌',
      //   minWidth: '120',
      //   prop: 'inspirationBrand',
      // },
      {
        label: '来源国家站点',
        minWidth: '120',
        prop: 'country',
      },
      {
        label: '款式来源',
        minWidth: '120',
        prop: 'styleSourceName',
      },
      {
        label: '价格',
        minWidth: '180',
        prop: 'uPrice',
        render(row) {
          return (
            <div class='tw-flex tw-flex-col tw-gap-2px'>
              <span>
                竞品划线价(US)：
                {row.uPrice}
              </span>
              <span>
                竞品售价(US)：
                {row.price}
              </span>
            </div>
          );
        },
      },
      {
        label: '建议供给方式',
        minWidth: '120',
        prop: 'supplyName',
      },
      {
        label: '灵感创建时间',
        minWidth: '120',
        prop: 'createdTime',
        render(row) {
          return filters.formatTime(row.createdTime);
        },
      },
      {
        label: '数据来源',
        minWidth: '120',
        prop: 'dataSource',
      },
      {
        label: '识别品类',
        minWidth: '120',
        prop: 'category',
      },
      {
        label: '识别结果',
        minWidth: '120',
        prop: 'result',
        render(row) {
          const { label, type } = IDENTIFY_STATUS_LIST.find(i => i.value === row.result) ?? {};
          return (
            <el-text type={type}>{label}</el-text>
          );
        },
      },
      {
        label: '款式类型',
        minWidth: '120',
        prop: 'styleType',
      },
      {
        label: '识别标签',
        minWidth: '320',
        prop: 'tags',
        render(row) {
          return (
            <div class='tw-flex tw-flex-wrap tw-gap-6px'>
              {
                row.tags.map(i => (
                  <el-tag type='warning'>{i}</el-tag>
                ))
              }
            </div>
          );
        }
      },
      {
        label: '灵感提交次数',
        minWidth: '120',
        prop: 'submitNum',
      },
      {
        label: '状态',
        minWidth: '120',
        prop: 'status',
        render(row) {
          const { label, type } = SUBMIT_STATUS_LIST.find(i => i.value === row.status) ?? {};
          return (
            <el-text type={type}>{label}</el-text>
          );
        },
      },
      {
        label: '灵感创建时间',
        minWidth: '160',
        prop: 'createdTime',
        render(row) {
          return (
            <div class='tw-flex tw-flex-col'>
              <span>
                创建人：
                {row.creatorName}
              </span>
              <span>
                创建时间：
                {filters.formatTime(row.createdTime)}
              </span>
              <span>
                数据来源：
                {row.dataSource}
              </span>
            </div>
          );
        },
      },
      {
        label: '操作',
        width: '120',
        fixed: 'right',
        render(row) {
          return (
            <div>
              {
                TJRW.value && row.status === SUBMIT_STATUS_ENUM.WAIT && (
                  <el-button
                    link
                    type='primary'
                    onClick={() => handleSubmit(row.id, row)}
                  >
                    提交任务
                  </el-button>
                )
              }
              {
                LGRWXQ.value && (
                  <el-button
                    link
                    type='primary'
                    onClick={() => handleCheck(row.id)}
                  >
                    查看详情
                  </el-button>
                )
              }
              {
                BJSBPL.value && (
                  <el-button
                    link
                    type='primary'
                    onClick={() => editorIdentifieCcategories(row.id, row.category)}
                  >
                    编辑识别品类
                  </el-button>
                )
              }
            </div>
          );
        }
      },
    ];
  });

  return {
    tableColumns: columns,
    checkAll,
    isIndeterminate,
    form,
  };
};
