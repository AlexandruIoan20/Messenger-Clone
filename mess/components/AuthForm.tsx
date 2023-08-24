'use client'; 

import { useState, useCallback } from 'react'; 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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
    <div>AuthFo2rm</div>
  )
}

export default AuthForm