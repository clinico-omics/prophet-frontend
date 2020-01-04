import config from "../settings/index";

const state = {
  settings: config,
  isMobile: function() {
    // let flag = navigator.userAgent.match(
    //   /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|Symbian|Windows Phone)/i
    // );
    if (document.body.clientWidth > 1000) {
      return false;
    } else {
      return true;
    }
  },
  getClientWidth: function() {
    return document.body.clientWidth.toString();
  },
  sidebarActive: false
};

export default state;
