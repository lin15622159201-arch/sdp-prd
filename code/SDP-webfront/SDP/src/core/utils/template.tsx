import { ElButton, type ButtonProps } from 'element-plus';

export type handlerOption<T> = {
  buttonText: string | ((item: T) => string);
  isShow: boolean | ((item: T) => boolean);
  onClick: (item: T) => void;
  isDisabled?: boolean | ((item: T) => boolean);
  buttonProps?: Partial<ButtonProps>;
};

export function createHandler <T>(row: T, handlerOptions: handlerOption<T>[]) {
  const handleDisable = (handlerOption: handlerOption<T>) => {
    const { isDisabled } = handlerOption;
    if (typeof isDisabled === 'function') {
      return isDisabled(row);
    }
    return !!isDisabled;
  };

  const handleShow = (handlerOption: handlerOption<T>) => {
    const { isShow } = handlerOption;
    if (typeof isShow === 'function') {
      return isShow(row);
    }
    return isShow;
  };

  const handleProps = (handlerOption: handlerOption<T>) => {
    const defaultProps: Partial<ButtonProps> = {
      type: 'primary',
      link: true,
    };
    const { buttonProps } = handlerOption;
    if (buttonProps) {
      return {
        ...defaultProps,
        ...buttonProps,
      };
    }
    return defaultProps;
  };
  return handlerOptions
    .filter(handlerOption => handleShow(handlerOption))
    .map(
      handlerOption => (
        <ElButton
          {...handleProps(handlerOption)}
          disabled={handleDisable(handlerOption)}
          onClick={() => handlerOption.onClick(row)}
        >
          {handlerOption.buttonText}
        </ElButton>
      )
    );
}
