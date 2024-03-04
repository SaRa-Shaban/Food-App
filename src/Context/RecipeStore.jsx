import { createContext } from "react";
import  { useState , useEffect } from 'react'



export let RecipeContext = createContext(0);

export default function RecipeContextProvider(props) {
    
    let [counter, setCount] = useState(0)
    
   let decrement = ()=>{
      setCount(counter +=1)
   }


    // retun nameof context.provider
    return <RecipeContext.Provider value={{counter , decrement}}>
        {props.children}
    </RecipeContext.Provider>
}