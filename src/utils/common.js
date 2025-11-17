import { isEmpty } from "lodash"

export const log = (...arg) => {
  if (import.meta.env.NODE_ENV === "development") console.log(...arg)
}

export const getDataFromLocalStorage = (key, defaultData) => {
  const data = localStorage.getItem(key);
  return !isEmpty(data) ? JSON.parse(data) : defaultData
}

export const setDataInLocalStorage = (key, data) => {
  const json_data = JSON.stringify(data)
  localStorage.setItem(key, json_data)
}