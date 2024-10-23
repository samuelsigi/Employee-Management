import React from "react";
import './EmployeeItem.css';
import Card from "../../shared/UIElements/Card";  // Assuming you have this Card component
import { Link } from "react-router-dom";

const EmployeeItem = (props) => {
    return (
        <li className="employee-item">
            <Card className="employee-item__content">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Date of Birth</th>
                            <th>Date of Joining</th>
                            <th>Department</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.name}</td>
                            <td>{props.email}</td>
                            <td>{props.position}</td>
                            <td>{props.dateOfBirth}</td>
                            <td>{props.dateOfJoining}</td>
                            <td>{props.department}</td>
                            <td>{props.salary}</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <div className="center">
                <Card>
                    <Link to="/Employee/new">
                        <button>Add Employee</button>
                    </Link>
                </Card>
            </div>
        </li>
    );
}

export default EmployeeItem;
