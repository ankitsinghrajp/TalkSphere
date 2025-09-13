import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Settings } from 'lucide-react'
import moment from 'moment'

const Dashboard = () => {

  const Appbar = <div className='py-5 bg-gray-800 shadow-md shadow-black/40 '>
    <div className='flex justify-between'>
    <div className='flex items-center flex-row gap-[1rem]'>
    <Settings className='h-7 w-7 text-gray-300'/>
    <input className='' type="text" name="" id="" />
    <button>submit</button>

    </div>
        <div className='flex flex-end'>
      {moment().format('MMMM Do YYYY')}
    </div>
</div>

  </div>
  return (
    <AdminLayout>
        <div className='container mx-auto'>
          {
            Appbar
        }
        </div>
    </AdminLayout>
  )
}

export default Dashboard