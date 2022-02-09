export const setLocalStorageInfo = (key: string, info: any) => {
  localStorage.setItem(key, JSON.stringify(info));
};
export const setSessionStorageInfo = (key: string, info: any) => {
  sessionStorage.setItem(key, JSON.stringify(info));
};

export const getLocalStorageInfo = (key: string) => {
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
};

export const getSessionStorageInfo = (key: string) => {
  return window.sessionStorage.getItem(key)
    ? JSON.parse(window.sessionStorage.getItem(key))
    : null;
};

const setCookie = (cname: string, cvalue: string, exdays: number) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
};
