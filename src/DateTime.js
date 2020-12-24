import React, { useState, useEffect } from 'react'
import { func, string, object, bool } from 'prop-types'
import { useField } from 'formik'

import FieldWrapper from './FieldWrapper'
import InputDateBase from './InputDateBase'

const optionHours = []
const optionMinutes = []

for (let hour = 0; hour < 24; hour++) {
  optionHours.push(hour)
}

for (let minute = 0; minute < 60; minute++) {
  optionMinutes.push(minute)
}

const InputDateTime = ({
  explanation,
  disabled,
  label,
  name,
  maxDate = new Date(),
  minDate = new Date(maxDate.getFullYear() - 100, maxDate.getMonth()),
  onChange,
}) => {
  const [selected, setSelected] = useState({
    year: -1,
    month: -1,
    day: -1,
    hour: -1,
    minute: -1,
  })

  let [input, , { setValue }] = useField({ name })

  let { value } = input

  if (typeof value === 'string' || value instanceof String) {
    value = new Date(value)
  }

  const valueYear = value && value.getFullYear ? value.getFullYear() : -1
  const valueMonth = value && value.getMonth ? value.getMonth() : -1
  const valueDay = value && value.getDate ? value.getDate() : -1
  const valueHour = value && value.getHours ? value.getHours() : -1
  const valueMinute = value && value.getMinutes ? value.getMinutes() : -1

  useEffect(() => {
    const newSelected = {
      year: valueYear,
      month: valueMonth,
      day: valueDay,
      hour: valueHour,
      minute: valueMinute,
    }
    setSelected(newSelected)
  }, [valueDay, valueHour, valueMinute, valueMonth, valueYear])

  const applyDateChange = (newYear, newMonth, newDay, newHour, newMinute) => {
    if (newYear < 0 || newMonth < 0 || newDay < 0 || newHour < 0 || newMinute < 0) {
      const newSelected = {
        year: newYear,
        month: newMonth,
        day: newDay,
        hour: newHour,
        minute: newMinute,
      }

      setSelected(newSelected)
      return
    }

    const newDate = new Date(newYear, newMonth, newDay, newHour, newMinute)

    onChange(newDate)
    if (newDate - maxDate > 0) {
      setValue(maxDate)
      return
    }

    if (minDate - newDate > 0) {
      setValue(minDate)
      return
    }

    setValue(newDate)
  }

  const handleDateChange = (newYear, newMonth, newDay) => {
    applyDateChange(newYear, newMonth, newDay, selected.hour, selected.minute)
  }

  const handleTimeChange = ({ target: { value: elementValue } }, element) => {
    const newHour = element === 'hour' ? +elementValue : selected.hour
    const newMinute = element === 'minute' ? +elementValue : selected.minute
    applyDateChange(selected.year, selected.month, selected.day, newHour, newMinute)
  }

  const fieldWrapperProps = {
    name,
    explanation,
    label,
    disabled,
  }

  const inputProps = {
    value,
    maxDate,
    minDate,
    disabled,
  }

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <InputDateBase {...inputProps} handleChange={handleDateChange} />
      <div className="input-group" style={{ marginTop: 8 }}>
        <select style={{ marginRight: 4 }} value={selected.hour} onChange={(event) => handleTimeChange(event, 'hour')}>
          <option value={-1}>Hour</option>
          {optionHours.map((optionHour) => (
            <option key={optionHour} value={optionHour}>
              {optionHour}
            </option>
          ))}
        </select>
        <select
          style={{ marginLeft: 4 }}
          value={selected.minute}
          onChange={(event) => handleTimeChange(event, 'minute')}
        >
          <option value={-1}>Minute</option>
          {optionMinutes.map((optionMinute) => (
            <option key={optionMinute} value={optionMinute}>
              {optionMinute}
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  )
}

InputDateTime.propTypes = {
  explanation: string,
  label: string,
  disabled: bool,
  name: string.isRequired,
  onChange: func,
  maxDate: object,
  minDate: object,
}

InputDateTime.defaultProps = {
  onChange: () => {},
}

export default InputDateTime
