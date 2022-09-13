import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignupForm() {
  // using the useFormik hook

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password:'',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Username is Required'),

      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),

        password: Yup.string()
        .max(8, 'Must be 8 characters or less')
        .required('Password is Required')
    }),

    onSubmit: (values) => {
      // make a post request

      alert(JSON.stringify(values, null, 3));
    },
  });
  return (

    <div className="bg-slate-200 min-h-screen p-10 flex items-center justify-center">
    <div className="container mx-auto flex items-center justify-center">
     <div className="bg-white p-10 rounded-lg shadow-xl w-96">
     <h2 className="text-center mb-5 text-2xl font-bold">Sign Up Page</h2>
         
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label> <br></br> 
      <input
        className="bg-gray-100 rounded-md mb-3 focus:ring-2 text-2xl"
        id="username"
        name="username"
        type="text"
        required
        {...formik.getFieldProps('username')}
      />
      {formik.errors.username ? (
        <p className="text-red-500"> {formik.errors.username}</p>
      ) : null}

      <br></br><br></br>

      <label htmlFor="email">Email Address</label>  <br></br> 
      <input
        className="bg-gray-100 rounded-md mb-3 focus:ring-2 text-2xl"
        id="email"
        name="email"
        type="email"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? (
        <p className="text-red-500"> {formik.errors.email}</p>
      ) : null}
      
     <br></br><br></br>

     <label htmlFor="password"> Password</label>  <br></br> 
     <input
        className="bg-gray-100 rounded-md mb-3 focus:ring-2 text-2xl"
        id="password"
        name="password"
        type="password"
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <p className="text-red-500"> {formik.errors.password}</p>
      ) : null }
           
        
     <br></br><br></br>

     
     <button
      type="submit"
      className="bg-sky-500 p-1 rounded-full text-white px-4 hover:bg-sky-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
       >
      Sign Up
    </button>
    </form>

    </div>
    </div>
    </div>
  );
}