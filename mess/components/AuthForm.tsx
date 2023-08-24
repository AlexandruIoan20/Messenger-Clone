'use client'; 

import { useState, useCallback } from 'react'; 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from './buttons/Button';
import Input from './inputs/Input';

type Variant = 'LOGIN' | 'REGISTER'


const AuthForm = () => {
  const [ variant, setVariant ] = useState <Variant> ('LOGIN'); 
  const [ isLoading, setIsLoading ] = useState <boolean> (false); 

  const toggleVariant = useCallback( () => { 
    if(variant ===  'LOGIN') 
      setVariant('REGISTER'); 
    else 
      setVariant('REGISTER')
  }, [variant]); 

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FieldValues>({ 
    defaultValues: { 
      name: "", 
      email: "", 
      password: "", 
    }
  })

  const onSubmit: SubmitHandler <FieldValues> = (data) => { 
    setIsLoading(true); 

    if(variant === 'REGISTER') { 
      //fetch register
    }

    if(variant === 'LOGIN') { 
      //NEXT AUTH sign in
    }
  }

  const socialAction = (action: string) => { 
    setIsLoading(true); 

    //Next Auth Social Sign In
  }
  return (
    <div className = 'mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className = 'bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <form className = 'space-y-6' onSubmit = { handleSubmit(onSubmit) }>
            { variant === 'REGISTER' && 
              (
                <Input 
                  id = 'name'
                  label = 'Name'
                  type = 'text'
                  register={ register }
                  errors = { errors }
                /> 
              )
            }

              <Input 
                id = 'email'
                label = 'Email address'
                type = 'email'
                register={ register }
                errors = { errors }
              />      

              <Input 
                id = 'password'
                label = 'Password'
                type = { 'password' }
                register={ register }
                errors = { errors }
              />  
          </form>

          <div>
            <Button
              disabled = { isLoading }
              fullWidth
              type = 'submit'> 
              { variant === 'LOGIN' ? "Sign in" : 'Register'}
            </Button>
          </div>
        </div>
      </div>
  )
}

export default AuthForm