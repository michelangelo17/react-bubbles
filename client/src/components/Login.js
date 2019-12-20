import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const postLogin = values =>
    axiosWithAuth()
      .post('/login', values)
      .then(res => localStorage.setItem('token', res.data.payload))
      .catch(err => console.log(err))
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          await postLogin(values)
          history.push('/home')
          resetForm()
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(`can't be empty`),
          password: Yup.string().required(`can't be empty`),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <ErrorMessage name='username' component='p' />
            <Field
              type='username'
              name='username'
              placeholder='enter username'
            />
            <ErrorMessage name='password' component='p' />
            <Field
              type='password'
              name='password'
              placeholder='enter password'
            />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login
