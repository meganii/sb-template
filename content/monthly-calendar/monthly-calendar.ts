import { startOfMonth, endOfMonth, eachDayOfInterval, format, getYear, getMonth, addMonths } from 'date-fns';
import ja from 'date-fns/locale/ja';

function generateCalendar(year: number, month: number) {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    const calendar = daysInMonth.map((date) => ({
        date: format(date, '[yyyy-MM-dd](E)', { locale: ja }),
        dayOfMonth: date.getDate(),
        dayOfWeek: date.getDay(),
    }));

    return calendar;
}

function getTargetDay(target: string) {
    const today = new Date();
    if (target == 'nextMonth') {
      return addMonths(today, 1);
    } else {
      return today;
    }
}

try {
    const urlSearchParams = new URLSearchParams(location.search);
    const projectName = urlSearchParams.get("projectName");
    const target = urlSearchParams.get("target") || "";
    const targetDay = getTargetDay(target);
    const year = getYear(targetDay);
    const month = (getMonth(targetDay) + 1).toString().padStart(2, "0");
    const calendar = generateCalendar(year, targetDay.getMonth()+1);
    console.log(calendar);

    const pageTitle = `${year}-${month}`;
    const nextMonth = (getMonth(targetDay) + 2).toString().padStart(2, "0");
    const nextPageTitle = `${year}-${nextMonth}`;
    const prevMonth = (getMonth(targetDay)).toString().padStart(2, "0");
    const prevPageTitle = `${year}-${prevMonth}`
    let body = calendar.map(x => x.date).join('\n');

    const nav =
`
[${prevPageTitle}] <- ${pageTitle} -> [${nextPageTitle}]
[https://meganii.github.io/sb-template/monthly-calendar/?projectName=${projectName}&target=nextMonth 来月のページを作成]
`;
    body = body + nav;  

    if (projectName) {
        location.href = `https://scrapbox.io/${encodeURIComponent(projectName)}/${encodeURIComponent(pageTitle)}?${new URLSearchParams([["body", body],]).toString()}`
    } else {
        alert("projectNameの指定がありません")
    }
} catch (exception) {
    alert(exception);
}