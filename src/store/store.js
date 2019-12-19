import config from "../settings/index";

const state = {
  settings: config,
  isMobile: function() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
  },
  getClientWidth: function() {
    return document.body.clientWidth.toString();
  },
  sidebarActive: false
};

export default state;
