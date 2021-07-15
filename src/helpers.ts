import { ENV } from "./constants";

export const log = (message?: any, ...optionalParams: any[]) => {
  if (ENV.DEBUG) console.log(message, optionalParams)
};