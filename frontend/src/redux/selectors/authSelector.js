export const getAuth = (state) => state?.auth?.login?.token;
export const getCaptcha = (state) => state?.auth?.captcha;
export const getErrorCount = (state) => state?.auth?.login?.errorCount;
export const getErrorLogin = (state) => state?.auth?.login?.error;
export const getErrorMessageLogin = (state) => state?.auth?.login?.message;
