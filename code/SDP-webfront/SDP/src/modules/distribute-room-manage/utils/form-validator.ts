/* eslint-disable vue/max-len */
import type { Ref } from 'vue';
import { isMobileSimple } from './index';
import type {
  IWebClothingRoomAverageDailyOutput,
} from '../api/types';
// import type { FormRules } from 'element-plus/es/tokens';
import type { cooperationFormItem } from '../views/detail/config/cooperation-form';
import { ACCOUNT_TYPE_ENUM } from '../constant';
import { FormItemRule } from 'element-plus';

type TCooperationForm = typeof cooperationFormItem;
interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}

// eslint-disable-next-line vue/max-len
export const checkAddressDetail = (cooperationForm: Ref<TCooperationForm>, rule: FormItemRule, value: string, callback: Callback) => {
  const {
    roomAddressProvince,
    roomAddressCity,
    roomAddressArea,
    roomDetailAddress,
  } = cooperationForm.value;
  if (!roomAddressProvince || !roomAddressCity || !roomAddressArea || !roomDetailAddress) {
    return callback(new Error('请输入版房地址'));
  }
  return callback();
};

export const checkIdCard = (rule: FormItemRule, value: string, callback: Callback) => {
  const reg = /^[a-z0-9A-Z]{18}$/;
  if (value === '') {
    return callback();
  }

  const isIdCard = value && !reg.test(value);
  if (isIdCard) {
    return callback(new Error('请输入正确的身份证格式'));
  }
  return callback();
};

// eslint-disable-next-line vue/max-len
export const checkBankImage = (cooperationForm: Ref<TCooperationForm>, rule: FormItemRule, value: string, callback: Callback) => {
  const {
    bankFrontImage,
    bankBackImage,
    accountType,
  } = cooperationForm.value;
  if (accountType === ACCOUNT_TYPE_ENUM.ALIPAY) {
    return callback();
  }
  if (!bankFrontImage) {
    return callback(new Error('请上传银行卡正面图'));
  }

  if (!bankBackImage) {
    return callback(new Error('请上传银行卡反面图'));
  }
  return callback();
};

export const idCardIsOk = (value: string) => {
  const reg = /^[a-z0-9A-Z]{18}$/;
  return value && reg.test(value);
};

export const checkIdCardImage = (cooperationForm: Ref<TCooperationForm>, rule: FormItemRule, value: string, callback: Callback) => {
  const {
    idCard,
    idCardBackImage,
    idCardFrontImage,
  } = cooperationForm.value;
  if (idCard === '') {
    return callback();
  }
  const reg = /^[a-z0-9A-Z]{18}$/;
  const isIdCard = idCard && !reg.test(idCard);

  if (!isIdCard && !idCardFrontImage) {
    return callback(new Error('请上传身份证正面图'));
  }
  if (!isIdCard && !idCardBackImage) {
    return callback(new Error('请上传身份证背面图'));
  }
  if (!idCardFrontImage && idCardBackImage) {
    return callback(new Error('请上传身份证正面图'));
  }
  if (idCardFrontImage && !idCardBackImage) {
    return callback(new Error('请上传身份证背面图'));
  }
  return callback();
};

export const checkDailyAverage = (cooperationForm: Ref<TCooperationForm>, rule: FormItemRule, value: string, callback: Callback) => {
  const {
    wholeWomenClothing,
    wholeMenClothing,
    wholeChildrenClothing,
    makeWomenClothing,
    makeMenClothing,
    makeChildrenClothing,
  } = cooperationForm.value.averageDailyOutput as IWebClothingRoomAverageDailyOutput;

  if (!wholeWomenClothing
    && !wholeMenClothing
    && !wholeChildrenClothing
    && !makeWomenClothing
    && !makeMenClothing
    && !makeChildrenClothing) {
    return callback(new Error('请输入日均产量'));
  }

  return callback();
};

export const checkPhone = (rule: FormItemRule, value: string, callback: Callback) => {
  if (!isMobileSimple(value)) {
    return callback(new Error('请输入正确的电话格式'));
  }
  return callback();
};
