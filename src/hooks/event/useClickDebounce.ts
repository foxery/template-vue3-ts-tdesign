import debounce from 'lodash/debounce';
import router from "@/router"

interface ClickHandleOptions extends ClickMethodOptions{
  type?: 'OPEN_PAGE' | 'HANDLE';
  method?: (value: any) => void;
  url?: string;
}
interface ClickMethodOptions {
  value?: any;
}

const defaultDelay = 300;
export function useClickDebounce(delay?: number) {
  const common = (options: ClickHandleOptions) => {
    options.type ??= 'OPEN_PAGE'
    if (options.type === 'OPEN_PAGE' && options.url) {
      router.push(options.url);
    }
    if (options.type === 'HANDLE' && typeof options.method === 'function') {
      options.method(options?.value || '');
    }
  }
  const open = (url: string) => {
    if (url) {
      router.push(url);
    } else {
      throw new Error('need url path!')
    }
  }
  const method = (method: (T) => void, options: ClickMethodOptions) => {
    if (typeof method === 'function') {
      method(options?.value || '');
    } else {
      throw new Error('not a function!')
    }
  }
  // 执行页面打开或者方法
  const clickDebounce = debounce(common, typeof( delay ) === 'number'? delay : defaultDelay);
  // 执行方法
  const clickMethod = debounce(method, typeof( delay ) === 'number'? delay : defaultDelay);
  // 执行页面打开
  const openPage = debounce(open, typeof( delay ) === 'number'? delay : defaultDelay);

  return { clickDebounce, clickMethod, openPage };
}
