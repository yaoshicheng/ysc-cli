import get from "lodash/get";

const Cookie = {
  getCookie(name) {
    let arr;
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = get(document, "cookie", "").match(reg))) return unescape(arr[2]);
    else return null;
  },
  // eslint-disable-next-line camelcase
  setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000); // 毫秒为单位
    let expires = "expires=" + exdate.toGMTString(); // 过期参数以秒算 8小时

    // eslint-disable-next-line camelcase
    document.cookie =
      c_name + "=" + escape(value) + (expiredays == null ? "" : ";" + expires);
  },
  delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
};

export default Cookie;
