import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(4, 'minimum 4 character required')
    .required('Enter your name Please'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'minimum 8 character required')
    .required('Please select the place.'),
})

export const signInSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'minimum 8 character required')
    .required('Please select the place.'),
})
