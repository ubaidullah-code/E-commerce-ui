// import {React, useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
const LoginPage = () => {
  
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);
    try {
      const response = await axios.post('https://server-commerce-git-main-ubaidullah-codes-projects.vercel.app/login', {
        email: values.email,
        password: values.password,
      });
       
   
      navigate('/home'); // Redirect after success

    } catch (err) {
      setStatus({ error: err.response?.data?.message || 'Login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/sign" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-6">
              {status?.error && (
                <div className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
                  <AlertCircle className="inline w-5 h-5 mr-2" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Password Field */}
              <div className="text-left">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2 text-gray-900">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-100" />
                </span>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Google Sign-In Placeholder */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* <button
            onClick={() => alert('Google Sign-In is not implemented')}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M21.35 11.1h-9.18v2.92h5.4c-.24 1.4-1.07 2.6-2.28 3.39v2.8h3.68c2.16-1.99 3.38-4.91 3.38-8.41 0-.64-.07-1.26-.2-1.86z" />
              <path fill="#34A853" d="M12.17 22c2.99 0 5.51-.99 7.34-2.68l-3.68-2.8c-1.03.69-2.33 1.1-3.66 1.1-2.82 0-5.21-1.9-6.07-4.44H2.27v2.79A9.997 9.997 0 0012.17 22z" />
              <path fill="#FBBC05" d="M6.1 13.18a6.022 6.022 0 010-3.35v-2.79H2.27a9.992 9.992 0 000 8.93l3.83-2.79z" />
              <path fill="#EA4335" d="M12.17 4.44c1.62 0 3.07.56 4.22 1.66l3.16-3.16A9.948 9.948 0 0012.17 2C8.12 2 4.58 4.31 2.27 7.04l3.83 2.79c.86-2.55 3.25-4.44 6.07-4.44z" />
            </svg>
            Google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
