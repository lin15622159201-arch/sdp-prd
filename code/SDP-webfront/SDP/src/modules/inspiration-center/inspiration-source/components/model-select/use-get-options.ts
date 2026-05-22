import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { computed } from 'vue';
import { useAccountStore } from '@/store/account';
import { IUserMeResOrganization } from '@/api/iam/user/types';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export const useGetOptions = () => {
  const { getDictionaryOptions } = useDictionary();
  const accountStore = useAccountStore();

  const flattenOrganizationIds = (organization?: IUserMeResOrganization) => {
    if (!organization) return [];

    const ids: string[] = [];

    const queue: (IUserMeResOrganization | undefined)[] = [organization];

    while (queue.length) {
      const current = queue.shift();
      if (current) {
        ids.push(current.id);
        queue.push(current.parent);
      }
    }

    return ids;
  };

  const isModelAttrInOrganization = (item: IDictionaryItem, organizationIds: string[]) => {
    const { attributes = [] } = item;
    const attrKey = 'readableOrg';

    const attrItem = attributes.find(attr => attr.code === attrKey);

    if (!attrItem) return true;

    const { name } = attrItem;

    const settingOrgIds = name?.split(',').filter(Boolean) || [];

    return settingOrgIds.some(id => organizationIds.includes(id));
  };

  const fgModelVersion = computed(() => {
    const options = getDictionaryOptions(DICTIONARY_KEY.FG_MODEL_VERSION).filter(item => !item.disabled);

    const { account } = accountStore;
    const { organization } = account || {};

    const ids = flattenOrganizationIds(organization);

    return options.filter(item => isModelAttrInOrganization(item, ids));
  });

  return {
    fgModelVersion,
  };
};
