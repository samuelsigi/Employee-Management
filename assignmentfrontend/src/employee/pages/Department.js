import React, { useCallback, useReducer } from 'react';
import './Department.css'
import Input from '../../shared/UIElements/Input';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH,VALIDATOR_EMAIL } from '../../shared/UTIL/Validators';
import Button from '../../shared/UIElements/Button';

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

const NewEmployee = () => {

    const[formState,dispatch]=useReducer(formReducer,{
        inputs:{  
            fullname:{
                value: '',
                isvalid:false
            },
            email:{
                value:'',
                isvalid:false
            }
        },
        isvalid:false
    
    })

    const inputHandler =useCallback((id,value,isvalid)=>{
        dispatch({type:"INPUT_CHANGE",
            value:value, isvalid:isvalid,inputId:id});
    },[])


    const placeSumbitHandler = (event) =>{
        event.preventDefault();
        console.log(formState.inputs)
    }

    return(
        <form className='place-form' onSubmit={placeSumbitHandler}>
            {/* normal input tag for code reusability */}
            <Input id="fullname" element="input" type='text' label="FULL NAME" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(4)]} // to make sure value is not empty 
            errorText="Please Enter Valid Employee Name With Atleast 4 Characters" onInput ={inputHandler}></Input>

            <Input id="email"  element="input" type='text' label="EMAIL" validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]} 
            errorText="Please Enter Employee's Valid Email Address" onInput ={inputHandler} ></Input>

            <Input id="position" element="input" type='text' label="POSITION" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]} // to make sure value is not empty 
            errorText="Please Enter Employee's Position" onInput ={inputHandler}></Input>

            <Input id="department" element="input" type='text' label="DEPARTMENT" validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]} // to make sure value is not empty 
            errorText="Please Enter Employee's Department" onInput ={inputHandler}></Input>

            <Input id="dateOfBirth" element="input" type='date' label="DATE OF BIRTH" validators={[VALIDATOR_REQUIRE()]} // to make sure value is not empty 
            errorText="Please Enter Employee's Date Of Birth" onInput ={inputHandler}></Input>

            <Input id="dateOfJoining" element="input" type='date' label="DATE OF JOINING" validators={[VALIDATOR_REQUIRE()]} // to make sure value is not empty 
            errorText="Please Enter Employee's Date Of Joining" onInput ={inputHandler}></Input>

            <Input id="salary" element="input" type='text' label="SALARY" validators={[VALIDATOR_REQUIRE()]} // to make sure value is not empty 
            errorText="Please Enter Employee's Salary" onInput ={inputHandler}></Input>

            <Button type="submit" disabled={!formState.isvalid}>ADD EMPLOYEE</Button>    

        </form>
    )
}

export default NewEmployee;