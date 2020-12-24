const getDayCount = (selected) => {
  if ([3, 5, 8, 10].includes(selected.month)) {
    return 30
  }

  if (selected.month == 1) {
    if (selected.year % 400 == 0) {
      return 29
    } else if (selected.year % 4 == 0 && selected.year % 100 != 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

const getYearOptions = (min, max) => {
  const years = []
  for (let year = max.year; year >= min.year; year--) {
    years.push(year)
  }
  return years
}

const getMonthOptions = (min, max, selected) => {
  if (selected.year === -1) {
    return []
  }

  const monthIndexStart = selected.year === min.year ? min.month : 0
  const monthIndexEnd = selected.year === max.year ? max.month : 11

  const months = []
  for (let monthIndex = monthIndexStart; monthIndex <= monthIndexEnd; monthIndex++) {
    months.push(monthIndex)
  }

  return months
}

const getDayOptions = (min, max, selected) => {
  if (selected.month === -1 || selected.year === -1) {
    return []
  }

  const dayCount = getDayCount(selected)
  let firstDay = 1
  let lastDay = dayCount

  if (+max.year === +selected.year && +max.month === +selected.month) {
    lastDay = max.day
  }

  if (+min.year === +selected.year && +min.month === +selected.month) {
    firstDay = min.day
  }

  const days = []
  for (let day = firstDay; day <= lastDay; day++) {
    days.push(day)
  }

  return days
}

export { getDayCount, getDayOptions, getMonthOptions, getYearOptions }
