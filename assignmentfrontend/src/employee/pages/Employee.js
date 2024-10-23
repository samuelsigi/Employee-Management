import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import EmployeeList from '../components/EmployeeList'; 
import { useParams } from "react-router-dom";

const Employees = () => {
    const deptid = useParams().deptid;

    const [loadedEmployees, setLoadedEmployees] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        const sendRequest = async() =>{
            try{        
                const response = await fetch(`http://localhost:5000/api/department/${deptid}`);
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedEmployees(responseData.department.employee)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[deptid]);
    return(
        <div>
            {loadedEmployees && <EmployeeList items={loadedEmployees}/>}
            {error && <div>{error}</div>}
        </div>
    )

}

export default Employees;
