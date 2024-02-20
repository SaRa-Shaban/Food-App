import React from 'react'
import usersListImg from '../../../assets/images/usersListImg.png'
import Header from '../../../SharedModule/components/Header/Header'


export default function UsersList({title , description , headerBg}) {
  return (
    <>
          <Header title={`Users List`} description={"You can now add your items that any user can order it from the Application and you can edit"} headerBg={usersListImg}/>
          <div className='m-3 p-2'>
          <h4>Users Table Details</h4>
          <p className='text-muted'>You can check all details</p>
          </div>
    </>
  )
}
