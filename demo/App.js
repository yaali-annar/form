import { Form, Formik } from 'formik'
import React from 'react'
import {
  Checkbox,
  DateTime,
  File,
  Number,
  Password,
  Select,
  Text,
  TextArea
} from '../src'

const initialValues = {
  checkbox: '',
  datetime: '',
  file: '',
  number: 0,
  password: '',
  select: '',
  text: '',
  textarea: '',
}

const onSubmit = console.log

const App = () => {
  return (
    <Formik {...{ initialValues, onSubmit }}>
      <Form>
        <Checkbox label="Checkbox" name="checkbox" />
        <DateTime label="DateTime" name="datetime" />
        <File label="File" name="file" />
        <Number label="Number" name="number" />
        <Password label="Password" name="password" />
        <Select label="Select" name="select" options={[{ value: '1', text: '1' }]} />
        <Text label="Text" name="text" />
        <TextArea label="TextArea" name="textarea" />
      </Form>
    </Formik>
  )
}

export default App