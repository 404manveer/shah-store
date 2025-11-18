import React from 'react'
import MainRoutes from './mainRoutes/MainRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkauth } from './store/actions/userAction'


const App = () => {
  const dispatch = useDispatch((state)=>state.user)
  useEffect(()=>{
    dispatch(checkauth())
  },[dispatch])
  return (
     <div className='w-[100%] h-[100%] ' >
       <MainRoutes/>
     </div>
  )
}

export default App
