export const toDateTime = (_date: any) => {
    const date = new Date(_date)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    return dateTime
  }
  export const milisecondsToDay = 1000*60*60*24
  export const toTimestamp = (_date: any) => {
    const date = new Date(_date)
    return date.getTime()
  }