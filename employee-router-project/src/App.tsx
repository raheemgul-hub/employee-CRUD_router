import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import FRONTPAGE from "./pages/frontpage/FRONTPAGE";
import DETAIL from "./pages/employeedetail/DETAIL";
import TABLE from "./pages/employeetable/TABLE";
import DEPARTMENT from "./pages/department/DEPARTMENT";
import EMPLOYEE from "./pages/employee/EMPLOYEE";
import DEPARTMENTTABLE from "./pages/departmenttable/DEPARTMENTTABLE";
import EDUCATION from "./pages/educationform/EDUCATION";
import EDUCATIONTAB from "./pages/educationtable/EDUCATIONTAB";

function App() {
  return (
    //router for moving one page to another page
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<FRONTPAGE />}></Route>
          <Route path="table" element={<TABLE />}></Route>
          <Route path="employee" element={<EMPLOYEE />}></Route>
          <Route path="detail" element={<DETAIL />}></Route>
          <Route path="department" element={<DEPARTMENT />}></Route>
          <Route path="departmenttable" element={<DEPARTMENTTABLE />}></Route>
          <Route path="educationtable" element={<EDUCATIONTAB />}></Route>
          <Route path="educationform" element={<EDUCATION />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
