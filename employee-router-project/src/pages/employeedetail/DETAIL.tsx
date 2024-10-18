import { useEffect, useState } from "react";
import "./DETAIL.css";
import { iEmployee } from "../../interfaces/employee";
import { Link, useSearchParams } from "react-router-dom";
import { IEducation } from "../../interfaces/education";
function DETAIL() {
  const [employee, setEmployee] = useState<iEmployee>();
  const [education, setEducation] = useState<IEducation>();
  const [queryprams] = useSearchParams();
  //get employee data from local storage and for details
  useEffect(() => {
    const empId = Number(queryprams.get("id"));
    if (localStorage.getItem("emp")) {
      const e = localStorage.getItem("emp");
      if (e) {
        const emplist = JSON.parse(e);
        emplist.map((employee: iEmployee) => {
          if (employee.employeeId == empId) {
            setEmployee(employee);
          }
        });
      }
    }
  }, []);
  
    //get employee data from local storage and for details
  useEffect(() => {
    const empId = Number(queryprams.get("employeeId"));
    if (localStorage.getItem("education")) {
      const e = localStorage.getItem("education");
      if (e) {
        const emplist = JSON.parse(e);
        emplist.map((education: IEducation) => {
          if (education.employeeId == empId) {
            setEducation(education);
          }
        });
      }
    }
  }, []);

  return (
    <div className="employee-list">
      {employee !== undefined ? (
        <div className="employee-card">
          <Link to="/table">
            <div className="icon-container">
              <i className="fa-solid fa-circle-arrow-left"></i>
            </div>
          </Link>
          <div className="employee-details">
            <h1>
              Details of {employee.firstname} {employee.lastname}
            </h1>
            <p>
              <strong>First-Name:</strong> {employee.firstname}
            </p>
            <p>
              <strong>Last-Name:</strong> {employee.lastname}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Dergree:</strong> {education?.educationName}
            </p>
            {/* <p>
              <strong>Dergree-level:</strong> {education?.educationLevel}
            </p>
            <p>
              <strong>Percentage:</strong> {education?.educationPercentage}
            </p>
            <p>
              <strong>passing year:</strong> {education?.educationPassingYear}
            </p> */}
          </div>
          <Link to={"/educationtable?id=" + employee.employeeId} >
            <button type="button" className="btn btn-info">Education</button>
          </Link>
        </div>
      ) : (
        <p>employee Data is not available</p>
      )}
    </div>
  );
}
export default DETAIL;
