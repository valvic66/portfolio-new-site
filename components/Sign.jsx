import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

export const Sign = ({
  headerText,
  buttonLabel,
  linkText,
  linkLabel,
  signApi,
  apiError,
  isLoading,
}) => {
  const INITIAL_FORM_DATA = {
    email: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string()
      .min(8, 'Passwords must be at least 8 characters long')
      .matches(
        /^(?=.*([A-Z]){1,})(?=.*[!@#$&*_-]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$/,
        'The password must contain at least one uppercase, one lowercase, one digit and one special character'
      )
      .required('Password required'),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_DATA,
    validationSchema: FORM_VALIDATION,
    onSubmit: signApi,
  });

  const linkUrl = `/${linkLabel}`.toLowerCase();

  return (
    <div className="pt-20 w-full max-w-xs mx-auto">
      <div className="bg-white shadow-md rounded px-4 pt-6">
        <p className="text-lg text-blue-700 pb-6 pl-2 tracking-wider">{headerText}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" />
            <TextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              placeholder="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="password"
            />
          </div>
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            type="submit"
            // disabled={!userData.email || !userData.password}
          >
            {isLoading ? (
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
            ) : null}
            {buttonLabel}
          </Button>
        </form>
        {apiError && <p className="text-red-600 text-xs pt-2">{apiError}</p>}
        <div className="flex items-center justify-evenly pt-5">
          <p className="block text-gray-700 text-sm font-bold p-5">
            {linkText}
          </p>
          <Link href={linkUrl}>
            <li className=" text-blue-800 text-base list-none underline">
              {linkLabel}
            </li>
          </Link>
        </div>
      </div>
    </div>
  );
};
