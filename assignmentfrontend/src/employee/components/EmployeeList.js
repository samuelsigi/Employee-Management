import React from "react";
import './EmployeeList.css'
import EmployeeItem from "./EmployeeItem";


const EmployeeList =(props)=>{

    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>No Employee Found !?..</h2>
            </div>
        )
    }
    return(
        <ul className="users-list">
            {props.items.map(employee =>{
                return <EmployeeItem key={employee._id}
                                    id={employee._id}
                                    name={employee.fullname}
                                    email={employee.email}
                                    position={employee.position}
                                    dateOfBirth={employee.dateOfBirth}
                                    dateOfJoining={employee.dateOfJoining}
                                    department={employee.department}
                                    salary={employee.salary}
                                    />

            })}
        </ul>
    )
        



}
export default EmployeeList;