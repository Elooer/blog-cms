// 格式化时间
const addZero = (num: number) => {
  return num > 9 ? num : '0' + num
}

export default function (time: string | undefined): string {
  if (!time) return ''
  const date = new Date(time)
  const year = addZero(date.getFullYear())
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const hour = addZero(date.getHours())
  const min = addZero(date.getMinutes())
  const sec = addZero(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
