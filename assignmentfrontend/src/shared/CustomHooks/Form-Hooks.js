import { useReducer,useCallback } from "react";

const formReducer =(state,action)=>{
    switch(action.type){
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isvalid
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isvalid
                }
            }
            return{
                ...state,

                inputs:{
                    ...state.inputs,
                    [action.inputId] : {value:action.value,isvalid:action.isvalid}
                },
                isvalid:formIsValid
            };
        default:
            return state;
    }
}

export const useForm =(intialInpust,intialFormValidty)=>{

    const [formState,dispatch] = useReducer(formReducer,{
        inputs:intialInpust,
        isvalid:intialFormValidty
    })
    const inputHandler =useCallback((id,value,isvalid)=>{
        dispatch({type:"INPUT_CHANGE",
            value:value, isvalid:isvalid,inputId:id});
    },[])
    return[formState,inputHandler];


}







