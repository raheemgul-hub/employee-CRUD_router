import { useState, useRef, useEffect } from "react";
import { iEmployee } from "../../interfaces/employee";
import "./EMPLOYEE.css";
import { Link, useSearchParams } from "react-router-dom";
import { IDepartment } from "../../interfaces/department";
function EMPLOYEE() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [employee, setEmployee] = useState<iEmployee[]>([]);
  const id = useRef<number>(0);
  const [employeeId, setEmployeeId] = useState<number>(0);
  let [search] = useSearchParams();
  let getid = Number(search.get("id"));
  const [department, setDepartment] = useState("");
  const [departmentData, setDepartmentData] = useState<IDepartment[]>([]);
  //get department data from localstorage //
  useEffect(() => {
    if (localStorage.getItem("dep")) {
      var old_data = JSON.parse(localStorage.dep);
      setDepartmentData(old_data);
    }
  }, []);
  //get employee old data from local storage//
  useEffect(() => {
    const storedData = localStorage.getItem("emp");
    if (storedData) {
      const oldData: iEmployee[] = JSON.parse(storedData);
      setEmployee(oldData);

      let lastId = 0;
      oldData.map((o: iEmployee) => {
        if (o.employeeId == getid) {
          setFirstname(o.firstname);
          setLastname(o.lastname);
          setEmail(o.email);
          setAddress(o.address);
          setPhone(o.phone);
          setEmployeeId(o.employeeId);
          setDepartment(o.department);
        }
        if (o.employeeId > lastId) {
          lastId = o.employeeId;
        }
      });

      id.current = lastId + 1;
      if (getid == 0) {
        setEmployeeId(employeeId);
      }
    }
  }, []);

  const save = () => {
    //new-save//
    if (firstname && lastname && email && address && phone) {
      if (getid == 0) {
        const obj = {
          employeeId: id.current,
          firstname,
          lastname,
          email,
          address,
          phone,
          department,
         
        };

        id.current++;
        const newsave = [...employee, obj];
        setEmployee(newsave);
        localStorage.setItem("emp", JSON.stringify(newsave));
        //edit//
      }
      if (getid > 0) {
        let index: any;
        employee.map((e, i) => {
          if (e.employeeId == employeeId) {
            index = i;
          }
        });
        employee[index].firstname = firstname;
        employee[index].lastname = lastname;
        employee[index].email = email;
        employee[index].address = address;
        employee[index].phone = phone;
        employee[index].department = department;
        setEmployee([...employee]);
        localStorage.setItem("emp", JSON.stringify(employee));
      }
      resetForm();
    }
  };
  //clear inputs after saving//
  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setAddress("");
    setPhone("");
    setDepartment("");
  };

  return (
    <div className="main">
      {/*employee add-form */}
      <div className="container">
        <div className="header">
          <h2 className={getid == 0 ? "new" : "new d-none"}>New Employee</h2>
          <h2 className={getid > 0 ? "update" : "update d-none"}>
            Update Employee
          </h2>
          <Link to="/table">
            <button className="back-btn">BACK</button>
          </Link>
        </div>
        <form className="employee-form">
          <label htmlFor="first-name">
            First Name <span>*</span>
          </label>
          <input
            type="text"
            id="first-name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <label htmlFor="last-name">
            Last Name <span>*</span>
          </label>
          <input
            type="text"
            id="last-name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="address">
            Address <span>*</span>
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="DEPARTMENT">
            Department<span>*</span>
          </label>
          <select
            defaultValue={0}
            name="department"
            id="department"
            // value={department}
            onChange={(e: any) => setDepartment(e.target.value)}
          >
            <option value="0" disabled>
              select department
            </option>
            {departmentData.map((d: IDepartment) => (
              <option value={d.name} key={d.departmentId}>
                {d.name}
              </option>
            ))}
          </select>



          <Link to="/table">
            <button type="button" className="submit-btn" onClick={save}>
              Save
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default EMPLOYEE;
