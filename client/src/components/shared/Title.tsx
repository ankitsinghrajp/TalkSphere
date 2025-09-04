import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({
    title="TalkSphere - The Chat App",
    description = "This is the description of the chat app named Talksphere"
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name='description'content={description}/>
  </Helmet>
}

export default Title