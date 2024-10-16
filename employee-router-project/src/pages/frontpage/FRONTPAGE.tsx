import { Link } from 'react-router-dom';
import './FRONTPAGE.css'
function FRONTPAGE() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="animated-text">Welcome to Employee Management System</h1>
        <p className="animated-text">Manage your employees effectively and efficiently.</p>
        <Link to="table" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>

  );
}

export default FRONTPAGE;
