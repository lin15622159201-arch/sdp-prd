import ToyHttp2 from '@toy/http2';
import { ElMessage } from 'element-plus';
import { API_BASE, SYSTEM_ENUM } from '@/core/http/env';
import { CURRENT_CLIENT_CODE, SSO_SYSTEM_CODE } from '@/constant';

const http = new ToyHttp2<SYSTEM_ENUM>({
  requestDefaultConfig: {
    server: SYSTEM_ENUM.OLA_API,
  },
});

http.setDomain(API_BASE);
http.setHeader({
  'System-Code': SSO_SYSTEM_CODE,
  'Client-Code': CURRENT_CLIENT_CODE,
});

http.setForbiddenCallback(async () => {
  ElMessage.error('无权限访问该接口');
});

export default http;
