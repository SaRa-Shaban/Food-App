import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'

export default function RecipesList({adminData}) {
  return (
    <>
    <Header title={`Welcome recipes ${adminData?.userName}`} description={"This is a welcoming screen for the entry of the application , you can now see the options"}/>
    </>
  )
}
