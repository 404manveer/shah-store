import React from 'react'
import {useForm} from 'react-hook-form'
import {Input} from "../../components/ui/input"
import {Label} from '../../components/ui/label'
import {Button}  from '../../components/ui/button'
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userRegisteration } from '../../store/actions/userAction'
import {toast} from "sonner"

const Register = () => {
    const {register,reset,handleSubmit, watch,formState:{errors}} = useForm()
    const password = watch('password','')
    const username = watch('username','')
    const email = watch('email','')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registation =(data)=>{
        console.log('Form data',data);

        dispatch(userRegisteration(data))
        toast.success('user creater succesfully')
        navigate('/')
    
        

    }
    
  return (
  <section className='Register container flex items-center justify-center w-full  h-full ' >
    <form onSubmit={handleSubmit(registation)} className=' flex flex-col  space-y-5 ' >
      <div className=' username relative group ' >
          <Input  className=' border-black w-80  shadow-none  ' type='text' {...register("username",{required:true})}/>
            {errors.username && <span>Please entry username.</span>}
            <Label   className={` absolute  ${username.length>0?"-top-2 text-zinc-600":"top-2"  } left left-2 bg-white px-2 theme-transition-3 group-focus-within:-top-2 group-focus-within:text-zinc-600 text-zinc-400  `} >Username</Label>

      </div>
      <div className=' email relative group ' >
          <Input  className=' border-black w-80  shadow-none  ' type='email' {...register("email",{required:true})}/>
            {errors.email && <span>Please entry email.</span>}
            <Label className={` absolute  ${email.length>0?"-top-2 text-zinc-600":"top-2"  } left left-2 bg-white px-2 theme-transition-3 group-focus-within:-top-2 group-focus-within:text-zinc-600 text-zinc-400  `} >Email</Label>

      </div>
      <div className=' password relative group ' >
          <Input  className=' border-black w-80  shadow-none  ' type='password' {...register("password",{required:true})}/>
            {errors.password && <span>Please entry password.</span>}
            <Label className={` absolute  ${password.length>0?"-top-2 text-zinc-600":"top-2"  } left-2  bg-white px-2 theme-transition-3 group-focus-within:-top-2 group-focus-within:text-zinc-600 text-zinc-400  `} >Password</Label>

      </div>

      <Button className='text-white' type='submit' >Register</Button>
        
        


    </form>



  </section>
  )
}

export default Register