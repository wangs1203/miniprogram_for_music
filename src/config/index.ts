let noConsole = true;
let baseUrl = '';
const IS_DEV = process.env.NODE_ENV === 'development';

enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  CLIENT_ERROR = 400,
  AUTHENTICATE = 301,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}
if (IS_DEV) {
  baseUrl = 'http://localhost:3000';
  noConsole = false;
} else {
  // baseUrl = 'http://192.168.2.216:3000';
  // baseUrl = 'http://192.168.1.72:3000';
  baseUrl = 'http://172.16.3.123:3000';
  noConsole = true;
}
const BASE_URL = baseUrl;
const NO_CONSOLE = noConsole;
export {
  IS_DEV,
  HTTP_STATUS,
  NO_CONSOLE,
  BASE_URL
};
