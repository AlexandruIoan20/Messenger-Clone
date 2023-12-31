'use client'; 

import { useState, useCallback, useEffect } from 'react'; 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn, useSession} from 'next-auth/react'; 
import { useRouter } from 'next/navigation';

import AuthSocialButton from './buttons/AuthSocialButton';

import Button from './buttons/Button';
import Input from './inputs/Input';

import { BsGithub, BsGoogle } from 'react-icons/bs'; 

type Variant = 'LOGIN' | 'REGISTER'


const AuthForm = () => {
  const session = useSession(); 
  const router = useRouter(); 

  const [ variant, setVariant ] = useState <Variant> ('LOGIN'); 
  const [ isLoading, setIsLoading ] = useState <boolean> (false); 

  useEffect( () => {
    if(session?.status === 'authenticated') { 
      router.push("/users"); 
    }
   }, [session?.status, router])

  const toggleVariant = useCallback( () => { 
    if(variant ===  'LOGIN') 
      setVariant('REGISTER'); 
    else 
      setVariant('LOGIN')
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

  const onSubmit: SubmitHandler <FieldValues> = async (data) => { 
    setIsLoading(true); 

    if(variant === 'REGISTER') { 
      const response = await fetch('/api/register', { 
        method: "POST", 
        mode: 'cors', 
        body: JSON.stringify(data),  
        headers: { 
          'Content-Type': "applcation/json"
        }
      }); 

      if(response.ok) { 
        signIn('credentials', data);
        setIsLoading(false); 
        return; 
      } else { 
        toast.error('Something went wrong!'); 
      }

      setIsLoading(false); 
    }

    if(variant === 'LOGIN') { 
      console.log(data);  
      signIn('credentials', {
        ...data, 
        redirect: false
      }).then((callback: any) => { 
        console.log(callback); 
        if(callback.error) { 
          toast.error('Invalid credentials!')
        }

        if(callback?.ok && !callback.error) { 
          router.push("/users"); 
          toast.success('Logged In!')
        }
      }).finally( () => { 
        setIsLoading(false); 
      })
    }
  }

  const socialAction = (action: string) => { 
    setIsLoading(true); 

    signIn(action, { 
      redirect: false, 
    }).then( (callback) => { 
      if(callback?.error) { 
        toast.error('Invalid Credentials')
      }

      if(callback?.ok && !callback.error) { 
        toast.success('Logged In!'); 
        router.push("/users"); 
      }
    }).finally( () => { 
      setIsLoading(false); 
    })
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
                <Button
                  disabled = { isLoading }
                  fullWidth
                  type = 'submit'> 
                  { variant === 'LOGIN' ? "Sign in" : 'Register'}
              </Button>
            </form>


            { /*  HR custom component */}
            <div className = 'mt-6'>
              <div className = 'relative'>
                <div className = 'absolute inset-0 flex items-center'>
                  <div className = 'w-full border-t border-gray-300'>
                  </div>
                </div>
                <div className = 'relative flex justify-center text-sm'>
                  <span className = 'bg-white px-2 text-gray-500'>
                    Or continue with 
                  </span>
                </div>
              </div>

              <div className = 'empty-6 flex gap-2'>
                <AuthSocialButton 
                  icon = { BsGithub }
                  onClick = { () => { socialAction("github")}}
                /> 
                <AuthSocialButton 
                  icon = { BsGoogle }
                  onClick = { () => { socialAction("google")}}
                />
              </div>
            </div>
          <div>

            <div className = 'flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
              <div>
                { 
                  variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'
                }
              </div>
              <div onClick = { toggleVariant } className = 'cursor-pointer underline'>
                { variant === 'LOGIN' ? 'Create an account' : 'Login'}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuthForm