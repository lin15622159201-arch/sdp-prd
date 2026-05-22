/**
 * 将HTTP请求转换为cURL命令（bash格式）
 */

interface CurlOptions {
  method: string;
  url: string;
  headers?: Record<string, string>;
  data?: any;
}

/**
 * 生成cURL命令（bash格式）
 * @param options 请求配置
 * @returns cURL命令字符串
 */
export function generateCurlCommand(options: CurlOptions): string {
  const { method, url, headers = {}, data } = options;
  
  let curl = `curl -X ${method.toUpperCase()} '${url}'`;
  
  // 添加headers
  Object.entries(headers).forEach(([key, value]) => {
    curl += ` \\\n  -H '${key}: ${value}'`;
  });
  
  // 如果有data，添加body
  if (data) {
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    curl += ` \\\n  -d '${bodyStr}'`;
  }
  
  return curl;
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // 降级方案
    return new Promise((resolve, reject) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textarea);
        resolve();
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }
}

/**
 * 下载文本内容为文件
 * @param content 文件内容
 * @param filename 文件名
 */
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
