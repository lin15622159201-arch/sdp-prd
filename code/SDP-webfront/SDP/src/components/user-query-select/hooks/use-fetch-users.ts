import { ref } from 'vue';
import { userQueryFindPage as getUserListApi } from '../api';
import { IUserQueryFindPageResListItem as UserItem } from '../api/type';

export const useFetchUsers = () => {
  const options = ref<UserItem[]>([]);
  const loading = ref(false);

  // 在不需要查询接口情况下，使用此api来设置下拉回显
  const setOptions = (list: UserItem[]) => {
    options.value = list ?? [];
  };

  const remoteMethod = async (query: string) => {
    query = query.trim();
    if (!query) return;
    try {
      loading.value = true;
      const { data: { list } } = await getUserListApi({
        filters: {
          code: '',
          name: query,
        },
        pageNum: 1,
        pageSize: 999,
      });
      options.value = list;
    } finally {
      loading.value = false;
    }
  };

  return {
    options,
    loading,
    setOptions,
    remoteMethod,
  };
};
