import { Link, useSearchParams } from "react-router-dom";
import { IEducation } from "../../interfaces/education";
import { useEffect, useState } from "react";
import { iEmployee } from "../../interfaces/employee";
import "./educationtable.css"
function EDUCATIONTAB() {
  const [education, setEducation] = useState<IEducation[]>([]);
  const [empData, setEmpData] = useState<iEmployee[]>([]);
  const [searchParams] = useSearchParams();
  const employeeId = Number(searchParams.get("id"));

  //get education data fro local storage
  useEffect(() => {
    if (localStorage.getItem("education")) {
      const e = localStorage.getItem("education");
      if (e) {
        const emplist = JSON.parse(e);
        emplist.map((employee: IEducation) => {
          if (employee.employeeId == employeeId) {
            setEducation(emplist);
          }
        });
      }
    }
  }, []);


  //get employee data from local storage
  useEffect(() => {
    if (localStorage.getItem("emp")) {
      const e = localStorage.getItem("emp");
      if (e) {
        const emplist = JSON.parse(e);
        emplist.map((employee: iEmployee) => {
          if (employee.employeeId == employeeId) {
            setEmpData(emplist);
          }
        });
      }
    }
  }, []);


  //helper function for print the name in education table bar
  const printemp = () => {
    let depname: String = ''
    empData.map((e: iEmployee) => {

      if (e.employeeId == employeeId) {
        depname = depname = e.firstname + ' ' + e.lastname;
      }
    })
    return depname
  }


  //delete education//
  const deletebutton = (id: number) => {
    let index: any;
    education.map((d, i) => {
      if (d.educationId == id) {
        index = i;
      }
    });
    education.splice(index, 1);
    setEducation([...education]);
    localStorage.setItem("education", JSON.stringify(education));
  };

  return (
    <div className="table-container">
      <>
        <div className="header">
          <h2>Manage Education of {printemp()}</h2>
          <Link to={"/educationform?employeeId=" + employeeId}>
            <button className="add-btn">
              <i className="fa-solid fa-plus"></i> ADD
            </button>
          </Link>
        </div>
        <table className="employee-table table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Dergree Name</th>
              <th>Level</th>
              <th>Percentage</th>
              <th>passing-year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">

            {education.map((e: IEducation) => (
              e.employeeId === employeeId ? (
                <tr className="table" key={e.educationId}>
                  <td>{e.employeeId}</td>
                  <td>{e.educationName}</td>
                  <td>{e.educationLevel}</td>
                  <td>{e.educationPercentage}</td>
                  <td>{e.educationPassingYear}</td>
                  <td className="actions">
                    <Link to={"/educationform?id=" + e.employeeId}>
                      <i className="fa-solid fa-pen action-icon1"></i>
                    </Link>
                    
                    <i className="fa-solid fa-trash action-icon2"
                      onClick={() => deletebutton(e.educationId)}
                    ></i>
                  </td>
                </tr>
              ) : (null)


            ))}

          </tbody>
        </table>
      </>
    </div>
  );
}
export default EDUCATIONTAB;
