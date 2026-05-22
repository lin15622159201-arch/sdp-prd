import { useDialog } from '@toy/business-components';
import styles from './index.module.scss';
import { ref } from 'vue';
import { IGetDigitalPrintStyleInfoRes } from '@/modules/design-center/digital-print-style/api/types';
import { getDigitalPrintStyleInfo } from '@/modules/design-center/digital-print-style/api';

export const useSkcDetail = () => {
  const detail = ref<IGetDigitalPrintStyleInfoRes>();
  const getFileName = (name: string) => {
    return name.split('/').at(-1);
  };
  const { openDialog } = useDialog(() => ({
    width: 800,
    renderFooter: () => null,
    render() {
      return (
        <div>
          <div class={[styles.skc_panel, styles.panel]}>
            <div class={styles.header}>{detail.value?.designCode}</div>
            <div class={styles.main}>
              <custom-image
                class={styles.cover}
                src={detail.value?.styleImageList?.[0]}
                fix='cover'
                preview-src-list={detail.value?.styleImageList}
              />
              <div class={styles.info}>
                <div>
                  SPU：
                  {detail.value?.styleCode}
                </div>
                <div>
                  颜色：
                  {detail.value?.colorName}
                </div>
                <div>
                  AI品类：
                  {detail.value?.aiCategoryName}
                </div>
                <div>
                  内部品类：
                  {detail.value?.categoryName}
                </div>
                <div>
                  本土价：
                  {detail.value?.localPrice}
                  元
                </div>
                <div>
                  版型号：
                  {detail.value?.modelNumber}
                </div>
                <div>
                  跨境价：
                  {detail.value?.crossBorderPrice}
                  元
                </div>
                <div>
                  版型名称：
                  {detail.value?.modelName}
                </div>
              </div>
            </div>
          </div>
          <div class={[styles.style_panel, styles.panel]}>
            <div class={styles.left}>
              <div class={styles.title}>款式图片</div>
              <div class={styles.ul}>
                {detail.value?.styleImageList.map((v, index) => (
                  <custom-image
                    class={styles.img}
                    src={v}
                    key={v}
                    fit='cover'
                    preview-src-list={detail.value?.styleImageList}
                    initial-index={index}
                  />
                ))}
              </div>
            </div>
            <div class={styles.right}>
              <div class={styles.title}>生成图案</div>
              <div class={styles.ul}>
                {detail.value?.productImageList.map((v, index) => (
                  <custom-image
                    class={styles.img}
                    src={v}
                    key={v}
                    fit='cover'
                    preview-src-list={detail.value?.productImageList}
                    initial-index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <div class={[styles.fabric_panel, styles.panel]}>
            <div class={styles.title}>面料信息</div>
            <div class={styles.info}>
              <div>
                面料品名：
                {detail.value?.fabricInfo?.fabricName}
              </div>
              <div>
                面料克重：
                {detail.value?.fabricInfo?.fabricWeight}
              </div>
              <div>
                面料成分：
                {detail.value?.fabricInfo?.attributesList
                  .map(v => `${v.attributeName}：${v.attributeValue}%`).join('、')}
              </div>
            </div>
          </div>
          <div class={[styles.other_panel, styles.panel]}>
            <div class={styles.title}>其他信息</div>
            <div class={styles.item}>
              <div class={styles.label}>BOM：</div>
              <div class={styles.files}>
                {detail.value?.bomFileList.map(v => (
                  <el-link
                    class={styles.file}
                    key={v}
                    href={v}
                    target='_blank'
                  >
                    {getFileName(v)}
                  </el-link>
                ))}
              </div>
            </div>
            <div class={styles.item}>
              <div class={styles.label}>纸样文件：</div>
              <div class={styles.files}>
                {detail.value?.patternFileList.map(v => (
                  <el-link
                    class={styles.file}
                    key={v}
                    href={v}
                    target='_blank'
                  >
                    {getFileName(v)}
                  </el-link>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    },
  }));
  const handleSkcDetail = async (printingPrototypeId: string) => {
    const { data } = await getDigitalPrintStyleInfo({
      printingPrototypeId
    });
    detail.value = data;
    openDialog();
  };
  return {
    handleSkcDetail
  };
};
