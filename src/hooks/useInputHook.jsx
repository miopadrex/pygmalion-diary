import {useState} from "react";

import HomePage from "../pages/home/index.jsx";



export default function useInputHook({type}){


    const [value,setValue] = useState("")



    const onChange = (e)=>{
        const {value} = e.target
        setValue(value)
    }


    return{value,onChange}
}
