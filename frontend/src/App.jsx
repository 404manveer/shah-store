import React from 'react'
import MainRoutes from './mainRoutes/MainRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkauth } from './store/actions/userAction'

const App = () => {
  const dispatch = useDispatch((state)=>state.user)
  // useEffect(()=>{
  //   dispatch(checkauth())
  // },[dispatch])
  return (
      <MainRoutes/>
  )
}

export default App
