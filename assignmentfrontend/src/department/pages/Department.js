import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import DepartmentList from '../components/DepartmentList'

const Departments = () => {

    const [loadedDepartments, setLoadedDepartments] = useState();
    const [error,setError] = useState();
    useEffect(() => {
        const sendRequest = async() =>{
            try{       
                const response = await fetch('http://localhost:5000/api/department');
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedDepartments(responseData.department)
            }
            catch(err){
                setError(err.message)
            }
        }
        sendRequest();
    },[]);
    return(
        <div>
            {loadedDepartments && < DepartmentList items={loadedDepartments}/>}
            {error && <div>{error}</div>}
        </div>
    )


}

export default Departments;