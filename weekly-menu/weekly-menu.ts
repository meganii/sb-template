import { getISOWeek, startOfISOWeek, addDays, format, addWeeks } from 'date-fns'
import ja from 'date-fns/locale/ja'

const baseURL = 'https://meganii.github.io'

try {
  const urlSearchParams = new URLSearchParams(location.search)
  const projectName = urlSearchParams.get("projectName")
  const target = urlSearchParams.get("target") || ''
  const targetWeek = target.split('-')
  const year = targetWeek[0]
  const week = targetWeek[1]

  const startDate = startOfISOWeek(addWeeks(new Date(parseInt(year), 0), parseInt(week) - 1))
  const nextWeek = getISOWeek(addDays(startDate, 7)).toString().padStart(2, "0")
  const prevWeek = getISOWeek(addDays(startDate, -7)).toString().padStart(2, "0")

  const pageTitle = `今週のごはん ${year}-${week}W`
  const nextPageTitle = `今週のごはん ${year}-${nextWeek}W`
  const prevPageTitle = `今週のごはん ${year}-${prevWeek}W`

  let body = ''

  for (let i = 0; i < 7; i++) {
    const d = format(addDays(startDate, i), 'yyyy-MM-dd(E)', { locale: ja })
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
[${baseURL}/sb-template/weekly-menu/?projectName=${projectName}&target=${year}-${nextWeek} 来週のページを作成]
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