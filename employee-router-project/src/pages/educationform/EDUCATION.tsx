import { Link, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IEducation } from "../../interfaces/education";
import "./Education.css";

function EDUCATION() {
  //Create for storing input Fields
  const [educationId, setEducationId] = useState(0);
  const [educationName, setEducationName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [educationPercentage, setEducationPercentage] = useState(0);
  const [educationPassingYear, setEducationPassingYear] = useState(0);

  const [serach] = useSearchParams();
  const idd = Number(serach.get("id"));
  let id = useRef(0);
  const [eduarray, setEduArray] = useState<IEducation[]>([]);
  let lastId = 0;
  const [getemployeeId] = useSearchParams();
  const employeeId = Number(getemployeeId.get("employeeId"));

  //get edu key from Local-Storage and set in eduArray
  useEffect(() => {
    const storeddata = localStorage.getItem("education");

    if (storeddata) {
      const array: IEducation[] = JSON.parse(storeddata);
      setEduArray(array);
      array.map((edu: IEducation) => {
        if (edu.employeeId == idd) {
          setEducationId(edu.educationId);
          setEducationName(edu.educationName);
          setEducationLevel(edu.educationLevel);
          setEducationPercentage(edu.educationPercentage);
          setEducationPassingYear(edu.educationPassingYear);
        }
        lastId = 0;
        if (edu.educationId > lastId) {
          lastId = edu.educationId;
        }
      });
    }

    id.current = lastId + 1;
    if (idd == 0) {
      setEducationId(educationId);
    }
  }, []);

  //For creating Employee
  const creatingemployees = () => {
    if (idd == 0) {
      if (
        educationName &&
        educationLevel &&
        educationPercentage &&
        educationPassingYear
      ) {
        const object = {
          educationId: id.current,
          educationName: educationName,
          educationLevel: educationLevel,
          educationPercentage: educationPercentage,
          educationPassingYear: educationPassingYear,
          employeeId: employeeId,
        };
        id.current++;
        var newobj = [...eduarray, object];
        setEduArray(newobj);

        localStorage.setItem("education", JSON.stringify(newobj));
      }

    }


    //For Editing Employee
    else if (idd > 0) {
      let index: number = 0;
      eduarray.map((e, i) => {
        if (e.employeeId === employeeId) {
          index = i;
        }
      });

      eduarray[index].educationName = educationName,
        eduarray[index].educationLevel = educationLevel,
        eduarray[index].educationPercentage = educationPercentage,
        eduarray[index].educationPassingYear = educationPassingYear,
        eduarray[index].employeeId = employeeId;
      setEduArray(eduarray);

      localStorage.setItem("education", JSON.stringify(eduarray));
    }

  }
  return (

    <div>
      <div className="form-container">
        <div className="header">
          <h3>Add Education</h3>

          <Link to="/educationtable">
            <button className="btn btn-success">Back</button>
          </Link>
        </div>
        <div>
          <label htmlFor="name">Education Name *</label>
          <select
            defaultValue={0}
            onChange={(e) => setEducationName(e.target.value)}
          >
            <option value="0" disabled>
              select degree name
            </option>
            <option value="Matric">Matric</option>
            <option value="FSc">FSc</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PHD">PHD</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Select Level *</label>
          <select
            defaultValue={0}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <option value="0" disabled>
              select education level
            </option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="22">22</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Percentage *</label>
          <input
            type="number"
            id="percentage"
            placeholder="Enter percentage"
            value={educationPercentage}
            onChange={(c: any) => setEducationPercentage(c.target.value)}
          />
        </div>

        <div>
          <label htmlFor="year">Passing Years *</label>
          <input
            min="1950"
            max="2100"
            type="number"
            id="year"
            placeholder="Enter passing year"
            value={educationPassingYear}
            onChange={(c: any) => setEducationPassingYear(c.target.value)}
          />
        </div>
        <div>
          <Link to={"/educationtable?id=" + employeeId}>
            <button
              className="btn btn-success submit"
              onClick={creatingemployees}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default EDUCATION;
