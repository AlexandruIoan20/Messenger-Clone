import React from 'react';

import AuthForm from '@components/AuthForm';
import { FaFacebookMessenger } from 'react-icons/fa'; 

const Home = () => {
  return (
    <div className = 'flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
        <div className = 'sm:mx-auto sm:w-full sm:max-w-md'> {/* Mess Logo */}
            <FaFacebookMessenger className = 'text-blue mx-auto w-auto' size={48} /> 
            <h2 className = 'mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'> Sign in to your account</h2>
        </div>

        {/* Auth Form*/}
        <AuthForm/> 
    </div>
  )
}

export default Home