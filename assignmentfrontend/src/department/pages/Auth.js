import React, { useState,useContext } from "react";
import Card from "../../shared/UIElements/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/UTIL/Validators";
import { useForm } from "../../shared/CustomHooks/Form-Hooks";
import Button from "../../shared/UIElements/Button";
import './Auth.css'
import Input from "../../shared/UIElements/Input";
import { AuthContext } from "../../shared/Context/AuthContext";

const Auth = () =>{

    const [error,setError] = useState();

    const auth = useContext(AuthContext);
    // lisetening


    const [isLoginMode,setIsLoginMode] = useState(true);
    const switchModeHandler = () =>{
        setIsLoginMode(prevmode=>!prevmode)
    }

    const [formState, inputHandler]=useForm({
        ...(isLoginMode ? {} : {
            name: {
                value: '',
                isValid: false
            }
        }),
        username:{
            value:'',
            isvalid:false
        },
        password:{
            value:'',
            isvalid:false 
        }
    },false)


    const loginHandler = async (event) =>  {
        event.preventDefault();
    if(isLoginMode){
        if(formState.inputs.username.value==='admin' && formState.inputs.password.value==='admin@123'){
            auth.login();
        }else{
            setError("Invalid Crdentials")
        }
    }else{
        try{
            if(formState.inputs.username.value==='admin' && formState.inputs.password.value==='admin@123'){
            const response = await fetch("http://localhost:5000/api/department",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:formState.inputs.name.value
                })

            })
            const responseData = await response.json();
            console.log(responseData);
            if(!response.ok){
                throw new Error(responseData.message);
            }
            auth.login();
            }else{
                setError("Invalid Crdentials")
            }
        }catch(err){
            setError(err.message || "Something Went Wrong")
            console.log(err)
        }
    }
    
    }

    return(
        <Card className="authentication">
             <h2>{!isLoginMode? 'Signup' : 'Login' }</h2>
            <hr/>
            {error && <p className="error-text">{error}</p>}
        <form className="place-form" onSubmit={loginHandler}>

            {!isLoginMode && <Input element="input" 
                id="name" 
                type="text" 
                label="DEPARTMENT NAME" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please Enter A Valid Name"
                onInput={inputHandler}
                >
            </Input>}


            <Input element="input" 
            id="username" type="text" 
            label="USERNAME" 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter A Valid Username"
            onInput={inputHandler}
            >
            </Input>


            <Input element="input" 
            id="password" 
            type="password" 
            label="PASSWORD" 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter A Valid PASSWORD With 5 Characters"
            onInput={inputHandler}
            ></Input>

            <Button type="submit" disabled={!formState.isvalid}>
                {isLoginMode? 'LOGIN':'SIGNUP'}
            </Button>

        </form>
        <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode? 'SIGNUP':'LOGIN'}
        </Button>

        </Card>
    )

}

export default Auth;