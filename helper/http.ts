import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const defaultDelay = 0;
const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const CODE_DH_TOKEN_EXPIRE = "40001";
const CODE_LNS_TOKEN_EXPIRE = 16;

const CODE_UNAUTHORIZED = 401;

const TIMEOUT = 30 * 1000; // 30秒
const TIMEOUT2 = 10 * 60 * 1000; // 10分钟(文件传输超时时间)

const defaultOptions = {
  baseURL: "",
  timeout: TIMEOUT,
  headers: {},
};

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function setToken(token: string) {
  return localStorage.setItem(TOKEN_KEY, token);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || "";
}

function setRefreshToken(token: string) {
  return localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

function clearToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

function clearRefreshToken() {
  return localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export type LngProps = "en" | "zh";

const defaultLang: LngProps = "en";

const isLangProperty = (value: any): value is LngProps => {
  return value === "en" || value === "zh";
};

const getLng = () => {
  const localLng = localStorage.getItem("language");
  return isLangProperty(localLng) ? localLng : defaultLang;
};

let promise: Promise<boolean> | null = null;

async function refreshToken() {
  if (promise) {
    return promise;
  }
  promise = http
    .request({
      method: "GET",
      url: `/user/refresh-token`,
      params: {
        refreshToken: getRefreshToken(),
      },
      headers: {
        isRefreshToken: true,
      },
    })

    .then((resp: any) => {
      const { token, refreshToken } = resp.data;
      setToken(token);
      setRefreshToken(refreshToken);
      return true;
    })
    .catch(() => {
      clearRefreshToken();
      return false;
    });

  promise.finally(() => {
    promise = null;
  });

  return promise;
}

function isRefreshRequest(config: any) {
  return !!config.headers.isRefreshToken;
}

function getFilenameFromContentDisposition(contentDisposition: string) {
  const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = regex.exec(contentDisposition);
  if (matches != null && matches[1]) {
    return matches[1].replace(/['"]/g, "");
  }
  return null;
}

const addInterceptors = (ins: AxiosInstance) => {
  /**
   * @description 请求拦截器
   * 客户端发送请求 -> [请求拦截器] -> 服务器
   */
  ins.interceptors.request.use(
    config => {
      const token: string = getToken();
      if (config.url === "/user/login") {
        return config;
      }
      const Language = getLng()
      //后续多语言拓展需要调整映射逻辑
      config.headers["Accept-Language"] = Language === "en" ? "en" : "zh-CN";
      token && (config.headers.Authorization = `Bearer ${token}`);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  /**
   * @description 响应拦截器
   * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
   * token校验(JWT) : 接受服务器返回的token,存储到本地储存当中
   */
  ins.interceptors.response.use(
    async res => {
      const disposition = res.headers["content-disposition"];
      const filename = getFilenameFromContentDisposition(disposition);
      const isFileDownload = res.request["responseType"] === "blob" || "text";

      if (filename && isFileDownload) {
        return { data: res.data, filename };
      }

      if (res.data.code && res.data.error) {
        return Promise.reject(res.data);
      }

      return res.data;
    },
    async error => {
      const { response, config } = error;
      if (!window.navigator.onLine) {
        // 临时错误码,需要后续再调整
        return Promise.reject({ code: "12003", desc: "Internal Error" });
      }

      if (!response || !response.data) {
        return Promise.reject({ code: "12004", desc: "No response" });
      }

      if (response.status === 404) {
        return (window.location.href = "/404");
      }

      if (
        response.status === CODE_UNAUTHORIZED &&
        (response.data.errCode === CODE_DH_TOKEN_EXPIRE ||
          response.data.code === CODE_LNS_TOKEN_EXPIRE) &&
        !isRefreshRequest(config)
      ) {
        clearToken();
        const isSuccess = await refreshToken();
        if (isSuccess) {
          // 成功后补发请求，TODO: 考虑队列
          config.headers.Authorization = `Bearer ${getToken()}`;
          const resp = await ins.request(config);

          return resp;
        } else {
          return (window.location.href = "/login");
        }
      }

      return Promise.reject(response.data);
    }
  );
};

type AddInterceptors = (ins: AxiosInstance) => void;

interface ConfigOptions {
  baseURL: string;
}
class Http {
  private options: AxiosRequestConfig;
  private axios: AxiosInstance;

  constructor(config: ConfigOptions) {
    this.options = { ...defaultOptions, ...config };
    this.axios = axios.create(this.options);
  }

  setInterceptors(addInterceptors: AddInterceptors) {
    addInterceptors(this.axios);
  }

  request(config: AxiosRequestConfig & { delay?: number }): Promise<any> {
    const delay = config.delay ?? defaultDelay;
    return new Promise((resolve, reject) => {
      const timestamp = Date.now();
      this.axios
        .request(config)
        .then(response => {
          const diff = Date.now() - timestamp;
          if (delay && diff < delay) {
            setTimeout(() => {
              resolve(response);
            }, delay - diff);
          } else {
            resolve(response);
          }
        })
        .catch(err => reject(err));
    });
  }

  cancel() {
    return axios.CancelToken.source();
  }
}

const http = new Http({
  baseURL: "/api/v1"
});
http.setInterceptors(addInterceptors);

export { http };
