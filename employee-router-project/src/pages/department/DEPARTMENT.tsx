import { useEffect, useRef, useState } from "react";
import { IDepartment } from "../../interfaces/department";
import { Link, useSearchParams } from "react-router-dom";

function DEPARTMENT() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState<IDepartment[]>([]);
  let [departmentId, setDepartmentId] = useState(0);
  let id = useRef<number>(0);
  let [search] = useSearchParams();
  let getid = Number(search.get("id"));

  //get employee old data from local storage//
  useEffect(() => {
    const storedData = localStorage.getItem("dep");
    if (storedData) {
      const oldData: IDepartment[] = JSON.parse(storedData);
      setDepartment(oldData);

      let lastId = 0;
      oldData.map((o: IDepartment) => {
        if (o.departmentId == getid) {
          setName(o.name);
          setCode(o.code);
          setDescription(o.description);
          setDepartmentId(o.departmentId);
        }
        if (o.departmentId > lastId) {
          lastId = o.departmentId;
        }
      });

      id.current = lastId + 1;
      if (getid == 0) {
        setDepartmentId(departmentId);
      }
    }
  }, []);
  //SAVE DEPARTMENT//
  const save = () => {
    if (name && code && description) {
      if (getid == 0) {
        const obj = {
          departmentId: id.current,
          name,
          code,
          description,
        };
        id.current++;
        const newsave = [...department, obj];
        setDepartment(newsave);
        localStorage.setItem("dep", JSON.stringify(newsave));
      }
      if (getid > 0) {
        let index: any;
        department.map((d, i) => {
          if (d.departmentId == departmentId) {
            index = i;
          }
        });
        department[index].name = name;
        department[index].code = code;
        department[index].description = description;
        setDepartment([...department]);
        setDepartmentId(0);
        localStorage.setItem("dep", JSON.stringify(department));
      }
      setName("");
      setCode("");
      setDescription("");
    }

  };

  return (
    <div className="main">
      {/* add-form */}
      <div className="container">
        <div className="header">
          <h2 className={getid == 0 ? "new" : "new d-none"}>New Department</h2>
          <h2 className={getid > 0 ? "update" : "update d-none"}>
            Update Department
          </h2>
          <Link to="/table">
            <button className="back-btn">BACK</button>
          </Link>
        </div>
        <form className="employee-form">
          <label htmlFor="name">
            Department Name <span>*</span>
          </label>
          <input
            type="text"
            id="first-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="code">
            Department Code <span>*</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <label htmlFor="description">
            Despription <span>*</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Link to="/departmenttable">
            <button type="button" className="submit-btn" onClick={save}>
              {getid == 0 ? "Save" : "update"}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default DEPARTMENT;
