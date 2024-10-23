import React from "react";
import './DepartmentItem.css'
import Card from "../../shared/UIElements/Card";
import {Link} from "react-router-dom";


const DepartmentItem = (props)=>{
    return(
        <li className="department-item">
            <Card className='department-item__content'>
                <Link to={`/${props.id}/employees`}>
                    <div className="department-item__info">
                        <h2>{props.name}</h2>
                        <h2>{props.id}</h2>
                        <h3>{props.employee} {props.employee===2? 'Employees' :'Employee'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default DepartmentItem;