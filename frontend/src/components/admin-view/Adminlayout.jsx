
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const  Adimlayout = () => {
  return (
    <section>
      <Sidebar/>
        <div>
            {/* header */}
            <Header/>
            <main>
                <div className='w-full  ' >
                    admin-view
                <Outlet/>

                </div>
            </main>
        </div>
    </section>

)
}

export default Adimlayout