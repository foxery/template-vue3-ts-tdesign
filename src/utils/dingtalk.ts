import * as dd from 'dingtalk-jsapi';
const env = import.meta.env.MODE || 'development';

console.log('env')

class Dingtalk {

  goto: string;

  backUrl: string;

  state: number;

  urlPreffix: string;

  appid: string;

  domain: string;


  constructor() {
    // 文档地址：https://open.dingtalk.com/document/orgapp-server/scan-qr-code-to-log-on-to-third-party-websites
    this.state = Math.random();
    this.appid = 'appid';
    // this.domain = proxy[env].host;
    this.domain = location.origin;
    this.urlPreffix = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.appid}&response_type=code&scope=snsapi_login&state=`;
    this.backUrl = encodeURIComponent(`${this.domain}/#/qrcode-login`); // 扫码后跳转的地址
    this.goto = `${this.urlPreffix}${this.state}&redirect_uri=${this.backUrl}`;
  }

  /**
   * 初始化钉钉二维码
   */
  public init() {
    const scriptEle = document.createElement('script');
    const win: any = window;

    scriptEle.src = 'https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js';
    document.head.appendChild(scriptEle);

    const handleMessage = (event: any) => {
      const { origin, data } = event;
      if (origin === 'https://login.dingtalk.com') {
        const redirectUri = `${this.goto}&loginTmpCode=${data}`;
        console.log('redirectUri=', redirectUri);
        if (win.parent === window) {
          parent.location.href = redirectUri;
        } else {
          win.parent.location.href = redirectUri;
        }
      }
    };

    if (typeof win.addEventListener !== 'undefined') {
      win.addEventListener('message', handleMessage, false);
    } else if (typeof win.attachEvent !== 'undefined') {
      win.attachEvent('onmessage', handleMessage);
    }
  }
  /**
   * 显示钉钉二维码
   * @description 等待script标签创建完毕再调用这个方法
   * @param { String } codeId 显示二维码的id
   */
  public showCode(codeId: string) {
    setTimeout(() => {
      // @ts-ignore
      DDLogin({
        id: codeId,
        goto: encodeURIComponent(this.goto),
        style: 'background-color: transparent;border: none',
        with: '210',
        height: '310',
      });
    }, 1000/60);
  }
}


export default Dingtalk;
