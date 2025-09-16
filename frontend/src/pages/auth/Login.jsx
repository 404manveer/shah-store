
import {useForm} from 'react-hook-form'
import {Input} from "../../components/ui/input"
import {Label} from '../../components/ui/label'
import {Button}  from '../../components/ui/button'
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from "sonner"
import { userloging } from '../../store/actions/userAction'

const Register = () => {
    const {register,reset,handleSubmit, watch,formState:{errors}} = useForm()
    const password = watch('password','')
    const email = watch('email','')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registation =(data)=>{
        console.log('Form data',data);
        dispatch(userloging(data)).then((data)=>{

          console.log("login user>>>>>>",data);
          if(data.payload?.success){
            toast.success(data.payload.user.name,data.payload.message)
            navigate('/')
          }
          
        })
        // toast.success('user creater succesfully')

        
    
        

    }
    
  return (
  <section className='Register container flex items-center justify-center w-full  h-full ' >
    <form onSubmit={handleSubmit(registation)} className=' flex flex-col  space-y-5 ' >
     
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

      <Button className='text-white' type='submit' >login</Button>
      <span className=' text-center ' >don't have account. <a href="/register" className='text-blue-800 underline  ' >Create now</a></span>
        
        


    </form>



  </section>
  )
}

export default Register