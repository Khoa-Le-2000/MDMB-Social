export const getAuth = (state) => state?.auth?.token;
export const getCaptcha = (state) => state?.auth?.captcha;
export const getErrorCount = (state) => state?.auth?.captcha?.errorCount;
export const getErrorLogin = (state) => state?.auth?.login?.error;
export const getErrorMessageLogin = (state) => state?.auth?.login?.message;
export const getRedirect = (state) => state?.auth?.redirect;

export const getErrorRegister = (state) => state?.auth?.register?.error;
export const getErrorMessageRegister = (state) =>
  state?.auth?.register?.message;
