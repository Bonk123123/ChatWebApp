import React from 'react'
import { redirect } from 'next/navigation'

const page = () => {
  redirect('/chat')
  return (
    <div>page</div>
  )
}

export default page