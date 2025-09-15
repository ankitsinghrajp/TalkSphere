import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import TableComponent from '../../components/shared/Table'
import { Avatar } from '../../components/ui/avatar'
import {dashboardData} from "../../components/constants/sampleData"

const columns = [
  {
    field:"_id",  // Changed from "id" to "_id"
    headerName:"ID",
  },
  {
    field:"name",
    headerName:"Name",
  },
  {
    field:"username", 
    headerName:"Username",
  },
  {
   field:"friends",
   headerName:"Friends",
  },
  {
    field:"groups",
    headerName:"Groups",
  },
]

const UserManagement = () => {

  const [rows,setRows] = useState([]);
  
useEffect(() => {
   setRows(dashboardData.users);
}, [rows])

  return (
    <AdminLayout>
        <div className='h-[100vh]'>
            <TableComponent heading={"All Users"} columns={columns}  rows={rows}/>
        </div>
    </AdminLayout>
  )
}

export default UserManagement