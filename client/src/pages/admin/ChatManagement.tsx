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
    width: 300
  },
  {
    field:"totalMembers", 
    headerName:"Total Members",
    width:120,
  },
  
  {
    field:"totalMessages",
    headerName:"Total Messages",
  },
  {
    field:"creator",
    headerName:"Created By",
    width:250,
    renderCell:(params)=>(
      <div className=''>
        {params.row.creator.name}
      </div>
    )
  },
]

const ChatManagement = () => {

  const [rows,setRows] = useState([]);
  
useEffect(() => {
    setRows(dashboardData.chats);
}, [rows])

  return (
    <AdminLayout>
        <div className='h-[100vh]'>
            <TableComponent heading={"All Users"} columns={columns}  rows={rows}/>
        </div>
    </AdminLayout>
  )
}

export default ChatManagement