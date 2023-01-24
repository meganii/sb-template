import { getYear, getISOWeek, startOfISOWeek, addDays, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const getTargetDay = (targetWeek) => {
  const today = new Date()
  if (targetWeek == 'nextWeek') {
    return addDays(today, 7)
  } else {
    return today
  }
}

try {
  const urlSearchParams = new URLSearchParams(location.search)
  const projectName = urlSearchParams.get("projectName")
  const targetWeek = urlSearchParams.get("target")

  const targetDay = getTargetDay(targetWeek)
  const year = getYear(targetDay)
  const week = getISOWeek(targetDay).toString().padStart(2, "0")
  const nextWeek = getISOWeek(addDays(targetDay, 7)).toString().padStart(2, "0")
  const prevWeek = getISOWeek(addDays(targetDay, -7)).toString().padStart(2, "0")
  const startDay = startOfISOWeek(targetDay)
  const pageTitle = `今週のごはん ${year}-${week}W`
  const nextPageTitle = `今週のごはん ${year}-${nextWeek}W`
  const prevPageTitle = `今週のごはん ${year}-${prevWeek}W`

  let body = ''

  for (let i = 0; i < 7; i++) {
    const d = format(addDays(startDay, i), 'yyyy-MM-dd(E)', { locale: ja })
    const content =
      `${d}
朝：
昼：
夜：

`
    body = body + content
  }

  const nav =
`
[${prevPageTitle}] <- ${pageTitle} -> [${nextPageTitle}]
[https://meganii.github.io/sb-template/weekly-menu/?projectName=${projectName}&target=nextWeek 来週のページを作成]
`
  body = body + nav

  // console.log(body)
  // console.log(week, day, format(startDay, 'yyyy-MM-dd', {locale: ja}))

  if (projectName) {
    location.href = `https://scrapbox.io/${encodeURIComponent(projectName)}/${encodeURIComponent(pageTitle)}?${new URLSearchParams([["body", body],]).toString()}`
  } else {
    alert("projectNameの指定がありません")
  }
} catch (exception) {
  alert(exception);
}