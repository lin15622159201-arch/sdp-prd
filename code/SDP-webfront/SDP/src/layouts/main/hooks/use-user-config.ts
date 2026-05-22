import { useAccountStore } from '@/store/account';
import { computed } from 'vue';
import { IUserConfig } from '../types';
import { useModifyPwd } from './use-modify-pwd';
import { jumpSSOSelectTenant } from '@/core/utils/sso';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useAppStore } from '@/store/app';
import { IUserMeResOrganization } from '@/api/iam/user/types';

export const useUserConfig = () => {
  const accountStore = useAccountStore();
  const { handleModifyPwd } = useModifyPwd();
  /**
   * 退出登录
   */
  const handleLogout = async () => {
    await accountStore.logout();
  };
  // const handleChangeCompany = () => {
  //   const appStore = useAppStore();
  //   const ssoUrl = appStore.systemDomain ? appStore.systemDomain[SYSTEM_ENUM.LOGIN_WEB]! : '';
  //   jumpSSOSelectTenant(ssoUrl);
  // };
  const getNameList = (orgItem: IUserMeResOrganization, orgNameList: string[]) => {
    orgNameList.push(orgItem.name);
    if (orgItem.parent) {
      getNameList(orgItem.parent, orgNameList);
    }
    return orgNameList;
  };

  const orgName = computed(() => {
    if (accountStore.account && accountStore.account.organization) {
      const list = getNameList(accountStore.account.organization, []);
      return list.reverse().join('-');
    }

    return '';
  });
  const userConfig = computed<IUserConfig>(() => ({
    userName: `${accountStore.account?.account?.name}${accountStore.account?.code
      ? `(${accountStore.account?.code})` : ''}`,
    companyName: accountStore.account?.tenant?.name,
    orgName: orgName.value.replace(new RegExp(`${accountStore.account?.tenant?.name || ''}-?`), ''),
    operations: [
      // {
      //   name: '切换租户',
      //   icon: 'font_family icon-qiehuan',
      //   onClick() {
      //     handleChangeCompany();
      //   },
      // },
      {
        name: '修改密码',
        icon: 'font_family icon-xiugaimima',
        onClick() {
          handleModifyPwd();
        },
      },
      {
        name: '退出登录',
        icon: 'font_family icon-tuichu',
        onClick() {
          handleLogout();
        },
      },
    ]
  }));
  return {
    userConfig
  };
};
