import { request } from '@/utils/request';

/**
 * 登录
 * @param account 账号
 * @param password 密码
 * @returns
 */
export function Login(account: string, password: string) {
  return request.post<{ token: string; user: any }>({
    url: '/login',
    data: { account, password },
  });
}
