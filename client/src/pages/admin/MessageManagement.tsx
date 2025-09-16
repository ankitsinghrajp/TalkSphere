import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import TableComponent from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/sampleData'
import moment from 'moment'
import { fileFormat } from '../../lib/feature'
import RenderAttachments from '../../components/shared/RenderAttachments'

const columns = [
  {
    field:"_id",  // Changed from "id" to "_id"
    headerName:"ID",
  },
  {
    field:"attachments",
    headerName:"Attachments",
    renderCell:(params)=>{
      const attachments = params.row.attachments;
      if(!attachments || attachments.length === 0) {
        return <span className="text-gray-500">No attachments</span>;
      }
      
      return <div>
        {attachments.map(i=>{

          const url = i.url;
          const file = fileFormat(url);

          return <div>
            <a 
            href={url}
            download
            target='_blank'

            >
            {RenderAttachments(file,url)}
            </a>
          </div>
        })}
      </div>
    }
  },
  {
    field:"content", 
    headerName:"Content",
    width:400
  },
  {
   field:"sender",
   headerName:"Sent By",
   renderCell:(params)=>(
    <span>{params.row.sender.name}</span>
   )
  },
  {
    field:"chat",
    headerName:"Chat",
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
  },
  {
    field:"createdAt",
    headerName: "Time",
     renderCell:(params)=>(
    <span>{moment(params.createdAt).format("Do MMM YYYY, h:mm:ss a")}</span>
   )
  }
]

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
      setRows(dashboardData.messages);
  },[rows])

  return (
    <AdminLayout>
        <TableComponent heading={'All Messages'} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default MessageManagement