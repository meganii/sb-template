import { getYear, getISOWeek, getISODay, startOfISOWeek, addDays, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const today = new Date()
const year = getYear(today)
const week = getISOWeek(today)
const startDay =  startOfISOWeek(today)
const pageTitle = `🍚献立 ${year}-${week}W`

let body = ''

for (let i=0; i<7; i++) {
  const d = format(addDays(startDay, i), 'yyyy-MM-dd(E)', {locale: ja})
  const content = 
`${d}
朝：
昼：
夜：

`
  body = body + content
}

// console.log(body)
// console.log(week, day, format(startDay, 'yyyy-MM-dd', {locale: ja}))

try {
  const urlSearchParams = new URLSearchParams(location.search)
  const projectName = urlSearchParams.get("projectName")
  if (projectName) {
    location.href = `https://scrapbox.io/${encodeURIComponent(projectName)}/${encodeURIComponent(pageTitle)}?${new URLSearchParams([["body", body],]).toString()}`
  } else {
    alert("projectNameの指定がありません")
  }
} catch (exception) {
  alert(exception);
}