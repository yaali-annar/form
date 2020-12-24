import React, { useState, useEffect } from 'react'
import { func, object, bool } from 'prop-types'

import { getYearOptions, getMonthOptions, getDayOptions } from './util'
import { defaultLabels } from './messages'

const InputDateBase = (props) => {
  const {
    labels,
    value: valueDate,
    maxDate = new Date(),
    minDate = new Date(maxDate.getFullYear() - 100, maxDate.getMonth()),
  } = props

  const [selected, setSelected] = useState({ year: -1, month: -1, day: -1 })

  // Value is null if not filled
  const max = {
    year: maxDate.getFullYear(),
    month: maxDate.getMonth(),
    day: maxDate.getDate(),
  }
  const min = {
    year: minDate.getFullYear(),
    month: minDate.getMonth(),
    day: minDate.getDate(),
  }

  const value =
    valueDate && valueDate.getFullYear
      ? { year: valueDate.getFullYear(), month: valueDate.getMonth(), day: valueDate.getDate() }
      : { year: -1, month: -1, day: -1 }

  useEffect(() => {
    setSelected({
      year: value.year,
      month: value.month,
      day: value.day,
    })
  }, [value.day, value.month, value.year])

  useEffect(() => {
    const newSelected = {}
    let mustUpdateSelected = false

    if (min.year === max.year) {
      mustUpdateSelected = true
      newSelected.year = min.year

      if (min.month === max.month) {
        newSelected.month = min.month
      }
    }

    if (mustUpdateSelected) {
      setSelected((previousSelected) => ({ ...previousSelected, ...newSelected }))
    }
  }, [max.month, max.year, min.month, min.year])

  const options = {
    years: getYearOptions(min, max),
    months: getMonthOptions(min, max, selected),
    days: getDayOptions(min, max, selected),
  }

  const handleChange = ({ target: { value: elementValue } }, element) => {
    const newYear = element === 'year' ? +elementValue : selected.year
    const newMonth = element === 'month' ? +elementValue : selected.month
    const newDay = element === 'day' ? +elementValue : selected.day

    const newSelected = {
      year: newYear,
      month: newMonth,
      day: newDay,
    }

    setSelected(newSelected)

    if (newYear > -1 && newMonth > -1 && newDay > -1) {
      props.handleChange(newYear, newMonth, newDay)
    }
  }



  return (
    <div className="input-group">
      <select value={selected.year} onChange={(event) => handleChange(event, 'year')} disabled={props.disabled}>
        {options.years.length > 1 && <option value={-1}>{labels.year}</option>}
        {options.years.map((optionYear) => (
          <option key={optionYear} value={optionYear}>
            {optionYear}
          </option>
        ))}
      </select>
      <select
        style={{ margin: '0 8px' }}
        value={selected.month}
        onChange={(event) => handleChange(event, 'month')}
        disabled={props.disabled}
      >
        {selected.year === -1 && <option value={-1}>{labels.selectYear}</option>}
        {options.months.length > 1 && <option value={-1}>{labels.month}</option>}
        {options.months.map((monthValue) => (
          <option key={monthValue} value={monthValue}>
            {monthValue}
          </option>
        ))}
      </select>
      <select value={selected.day} onChange={(event) => handleChange(event, 'day')} disabled={props.disabled}>
        {selected.month === -1 && <option value={-1}>{labels.selectMonth}</option>}
        {options.days.length > 1 && <option value={-1}>{labels.day}</option>}
        {options.days.map((optionDay) => (
          <option key={optionDay} value={optionDay}>
            {optionDay}
          </option>
        ))}
      </select>
    </div>
  )
}

InputDateBase.propTypes = {
  labels: object,
  disabled: bool,
  handleChange: func,
  value: object,
  maxDate: object,
  minDate: object,
}

InputDateBase.defaultProps = {
  labels: defaultLabels,
  onChange: () => { },
}

export default InputDateBase
