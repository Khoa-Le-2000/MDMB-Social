export const getAuth = (state) => state?.login?.token;

export const getCaptcha = (state) => state?.login?.captcha;
export const getErrorCount = (state) => state?.login?.captcha?.errorCount;

export const getErrorLogin = (state) => state?.login?.error;
export const getErrorMessageLogin = (state) => state?.login?.message;
