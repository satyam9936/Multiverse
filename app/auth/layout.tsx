import React from 'react'

function Authlayout({children}:{children:React.ReactNode}) {
  return (
    <div className='h-full full items-center justify-center'>{children}</div>
  )
}

export default Authlayout