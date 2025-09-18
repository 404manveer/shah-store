
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const  Adimlayout = () => {
  return (
    <section className='flex flex-1  ' >
      <Sidebar/>
        <div className= 'flex flex-1 flex-col ' >
            {/* header */}
            <Header/>
            <main className=' flex flex-1 '>
                    admin-view
                <Outlet/>

            </main>
        </div>
    </section>

)
}

export default Adimlayout