import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  name: Yup.string()
    .matches(/^(?!.*[@.])[a-zA-Z0-9]+$/, 'Invalid userName format')
    .min(4, 'Minimum 4 characters required')
    .required('Enter your userName, please'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters required')
    .required('Please select the place.'),
});

export const signInSchema = Yup.object({
  name: Yup.string()
    .matches(/^(?!.*[@.])[a-zA-Z0-9]+$/, 'Invalid name format')
    .min(4, 'Minimum 4 characters required')
    .required('Enter your userName, please'),
  password: Yup.string()
    .min(8, 'minimum 8 character required')
    .required('Please select the place.'),
})
