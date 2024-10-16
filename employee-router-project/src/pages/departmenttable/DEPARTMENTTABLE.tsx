import { useEffect, useState } from "react";
import { IDepartment } from "../../interfaces/department";
import { Link } from "react-router-dom";

function DEPARTMENTTABLE() {
  const [department, setDepartment] = useState<IDepartment[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("dep");
    if (storedData) {
      const oldData: IDepartment[] = JSON.parse(storedData);
      setDepartment(oldData);
      let lastId = 0;
      oldData.map((o: IDepartment) => {
        if (o.departmentId > lastId) {
          lastId = o.departmentId;
        }
      });

      //   .current = lastId + 1;
    }
  }, []);


  const deletebutton = (id: number) => {
    let index: any;
    department.map((d, i) => {
      if (d.departmentId == id) {
        index = i;
      }
    });
    department.splice(index, 1);
    setDepartment([...department]);
    localStorage.setItem("dep", JSON.stringify(department));
  };
  return (
    //table
    <div>
      <div className="table-container">
        <div className="header">
          <h2>Manage Department</h2>
          <Link to={"/department"}>
            <button className="add-btn">
              <i className="fa-solid fa-plus"></i> ADD-DEPARTMENT
            </button>
          </Link>
        </div>

        <table className="employee-table table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>dep-Name</th>
              <th>dep-code</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {department.map((d: IDepartment) => (
              <tr className="table" key={d.departmentId}>
                <td>{d.departmentId}</td>
                <td>{d.name}</td>
                <td>{d.code}</td>
                <td>{d.description}</td>
                <td className="ICON">
                  <Link to={"/department?id=" + d.departmentId}>
                    <i className="fa-solid fa-pen action-icon1"></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash action-icon2"
                    onClick={() => deletebutton(d.departmentId)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DEPARTMENTTABLE;
