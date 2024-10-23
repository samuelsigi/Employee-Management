import React from "react";
import './DepartmentList.css'
import DepartmentItem from "./DepartmentItem";


const DepartmentList =(props)=>{

    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>No Departments Found !?..</h2>
            </div>
        )
    }
    return(
        <ul className="departments-list">
            {props.items.map(department =>{
                return <DepartmentItem key={department._id}
                                    id={department._id}
                                    name={department.name}
                                    employee={department.employee.length}/>

            })}
        </ul>
    )
        
}
export default DepartmentList;