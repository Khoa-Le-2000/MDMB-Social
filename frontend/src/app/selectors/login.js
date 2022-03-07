export const getAuth = (state) => state?.login?.auth;

export const getCaptcha = (state) => state?.login?.captcha;
export const getErrorCount = (state) => state?.login?.captcha?.errorCount;

export const getErrorLogin = (state) => state?.login?.error;
export const getErrorMessageLogin = (state) => state?.login?.message;

export const getFetchingLogin = (state) => state?.login?.isFetching;
