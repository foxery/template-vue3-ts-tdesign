/**
 * 防抖
 * @param fn
 * @param t 延迟事件(毫秒)
 * @returns
 */
export const AntiShake = (fn: () => void, t = 500) => {
  let delay = t;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }

    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, delay);

    if (callNow) fn.apply(this, args);
  };
};

/**
 * 是否是数组
 * @param target
 * @returns
 */
export const isArray = (target: any) => {
  return Array.prototype.isPrototypeOf(target);
};

/**
 * 下载文件
 * @param data 二进制文件流
 * @param fileName 文件名称
 */
export function DownloadBlobFile(data: string, fileName: string) {
  if ('download' in document.createElement('a')) {
    //非IE下载
    const link = window.document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([data]));
    link.style.display = 'none';
    link.download = decodeURIComponent(fileName);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } else {
    // IE10+下载
    (window.navigator as any).msSaveBlob(new Blob([data]), fileName);
  }
}
