import { Link } from "react-router-dom";
import { iEmployee } from "../../interfaces/employee";
import { useEffect, useState } from "react";

function TABLE() {
    const [employee,setEmployee]=useState<iEmployee[]>([])
    useEffect(() => {
        const storedData = localStorage.getItem("emp");
        if (storedData) {
          const oldData: iEmployee[] = JSON.parse(storedData);
          setEmployee(oldData);
          let lastId = 0;
          oldData.map((o: iEmployee) => {
            if (o.employeeId > lastId) {
              lastId = o.employeeId;
            }
          });
    
        //   .current = lastId + 1;
        }
      }, []);
 

//delete employEE//
const deletebutton = (id: number) => {
    let index: any;
    employee.map((e, i) => {
      if (e.employeeId === id) {
        index = i;
      }
    });
    employee.splice(index, 1);
    setEmployee([...employee]);
    localStorage.setItem("emp", JSON.stringify(employee));
  };

  return (
    <div className="table-container">
      <>
        <div className="header">
          <h2>Manage Employees</h2>
        <Link to="/employee">
        <button className="add-btn">
            <i className="fa-solid fa-plus"></i> ADD
          </button>
        </Link>
        <Link to='/departmenttable'>
        <button className="add-btn">
            <i className="fa-solid fa-plus"></i> Department
          </button>
        </Link>
        </div>
        <table className="employee-table table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {employee.map((e: iEmployee) => (
              <tr className="table" key={e.employeeId}>
                <td>{e.employeeId}</td>
                <td>{e.firstname}</td>
                <td>{e.lastname}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.phone}</td>
                <td>{e.department}</td>
                <td className="actions">
               <Link to={"/employee?id="+e.employeeId}>
               <i
                    className="fa-solid fa-pen action-icon1"
                  ></i>
               </Link>
                  <i
                    className="fa-solid fa-trash action-icon2"
                    onClick={() => deletebutton(e.employeeId)}
                  ></i>
                  <Link to={"/detail?id=" + e.employeeId}>
                    <button className="btn btn-sm btn-primary action-btn">
                      Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}
export default TABLE;

