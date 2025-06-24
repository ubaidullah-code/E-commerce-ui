import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router'; // Consider using 'react-router-dom' if needed
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setStatus(null);
    try {
      const { firstName, lastName, email, password } = values;
      const displayName = `${firstName} ${lastName}`;
      let result = await axios.post('http://localhost:5004/sign-up',{ first_name: firstName,
                last_name: lastName,
                email: email,
                password: password})
     
               navigate('/login')
   
      resetForm();
  
    } catch (error) {
      setStatus({ error: error.message || 'Failed to create an account' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="mt-8 space-y-6">
              {status?.error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
                  <AlertCircle className="inline w-5 h-5 mr-2" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* First Name */}
              <div className="text-left">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="firstName" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Last Name */}
              <div className="text-left">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="lastName" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Email */}
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Password */}
              <div className="text-left">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="text-left">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating account...' : 'Sign up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
