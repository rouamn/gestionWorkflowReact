import VideoBackground from "../pages/backroundvideo";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
function DemandeConges() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !startDate || !endDate || !type) {
      Swal.fire("Missing Fields", "Please fill in all the required fields.", "warning");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Retrieve the user ID from local storage

      if (!userId) {
        Swal.fire("User ID Missing", "User ID is missing. Please log in again.", "error");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const demandeConge = {
        utilisateurId: parseInt(userId), // Ensure the userID is parsed as an integer
        dateDebut: startDate.toISOString(),
        dateFin: endDate.toISOString(),
        type: type,
        commentaire: commentaire,
        statut: "Pending",
        email: email,
      };

      await axios.put("https://localhost:5001/Addconge", demandeConge, config);

      Swal.fire("Success!", "Your request for leave has been submitted.", "success").then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Reload the page to fetch the updated user list
        }
      });
    } catch (error) {
      console.log(error);
      setMessage("There was an error submitting your request for leave. Please try again.");
    }
  };
  return (
    <div>
      <div className="DashboardPage">
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>
      {/* [ Pre-loader ] End */}
      {/* [ navigation menu ] start */}
      <nav className="pcoded-navbar">
      <div className="navbar-wrapper">
        <div className="navbar-brand header-logo">
          <a href="index.html" className="b-brand">
            <div className="b-bg">
              <i className="feather icon-trending-up" />
            </div>
            <span className="b-title">Employee page </span>
          </a>
          <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span /></a>
        </div>
        <div className="navbar-content scroll-div">
          <ul className="nav pcoded-inner-navbar">
            <li className="nav-item pcoded-menu-caption">
            
            </li>
            <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" >
              <a href="/homeE" className="nav-link "><span className="pcoded-micon"><i className="feather icon-home" /></span><span className="pcoded-mtext">Dashboard</span></a>
          
            </li>

       
            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
              <a href="/demadeConges" className="nav-link "><span className="pcoded-micon"><i className="feather icon-file-text" /></span><span className="pcoded-mtext">Leave request</span></a>
            </li>
            <li data-username="Table bootstrap datatable footable" className="nav-item">
              <a href="/demnadeAvance" className="nav-link "><span className="pcoded-micon"><i className="feather icon-server" /></span><span className="pcoded-mtext">Advance request</span></a>
            </li>
            
            <li data-username="Charts Morris" className="nav-item"><a href="chart-morris.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-pie-chart" /></span><span className="pcoded-mtext">Chart</span></a></li>
            <li data-username="Calander" className="nav-item"><a href="/calander" className="nav-link "><span className="pcoded-micon"><i className="feather icon-map" /></span><span className="pcoded-mtext">Calander</span></a></li>
        
          </ul>
        </div>
      </div>
    </nav>
      {/* [ navigation menu ] end */}
      {/* [ Header ] start */}
      <header className="navbar pcoded-header navbar-expand-lg navbar-light">
        <div className="m-header">
          <a className="mobile-menu" id="mobile-collapse1" href="javascript:">
            <span />
          </a>
          <a href="index.html" className="b-brand">
            <div className="b-bg">
              <i className="feather icon-trending-up" />
            </div>
            <span className="b-title">Datta Able</span>
          </a>
        </div>
        <a className="mobile-menu" id="mobile-header" href="javascript:">
          <i className="feather icon-more-horizontal" />
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li>
              <a
                href="javascript:"
                className="full-screen"
                onclick="javascript:toggleFullScreen()"
              >
                <i className="feather icon-maximize" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle"
                href="javascript:"
                data-toggle="dropdown"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="main-search">
                <div className="input-group">
                  <input
                    type="text"
                    id="m-search"
                    className="form-control"
                    placeholder="Search . . ."
                  />
                  <a
                    href="javascript:"
                    className="input-group-append search-close"
                  >
                    <i className="feather icon-x input-group-text" />
                  </a>
                  <span className="input-group-append search-btn btn btn-primary">
                    <i className="feather icon-search input-group-text" />
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="dropdown">
                <a
                  className="dropdown-toggle"
                  href="javascript:"
                  data-toggle="dropdown"
                >
                  <i className="icon feather icon-bell" />
                </a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                    <div className="float-right">
                      <a href="javascript:" className="m-r-10">
                        mark as read
                      </a>
                      <a href="javascript:">clear all</a>
                    </div>
                  </div>
                  <ul className="noti-body">
                    <li className="n-title">
                      <p className="m-b-0">NEW</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>John Doe</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              30 min
                            </span>
                          </p>
                          <p>New ticket Added</p>
                        </div>
                      </div>
                    </li>
                    <li className="n-title">
                      <p className="m-b-0">EARLIER</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-2.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              30 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-3.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Sara Soudein</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              30 min
                            </span>
                          </p>
                          <p>currently login</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="noti-footer">
                    <a href="javascript:">show all</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown drp-user">
                <a
                  href="javascript:"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="icon feather icon-settings" />
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-notification">
                  <div className="pro-head">
                    <span>John Doe</span>
                    <a href="/" className="dud-logout" title="Logout">
                      <i className="feather icon-log-out" />
                    </a>
                  </div>
                  <ul className="pro-body">
                    <li>
                      <a href="javascript:" className="dropdown-item">
                        <i className="feather icon-user" /> Profile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
      {/* [ Header ] end */}
      {/* [ Main Content ] start */}
      {/* [ Main Content ] start */}
      <div className="container d-flex justify-content-center">
  <div className="card rounded p-5" style={{ width: "680px" }}>
    <div className="card-header">
      <h5>Demande Congés</h5>
    </div>
    <div className="card-body">
      {message && (
        <div className="alert alert-success mt-3">
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    id="startDate"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    id="endDate"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="roleType">Type</label>
              <select
                className="form-control"
                id="roleType"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="">Select a type</option>
                <option value="maladie">Maladie</option>
                <option value="vacance">Vacances</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Commentaire</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={commentaire}
                onChange={(event) => setCommentaire(event.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <form></form>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Input group */}
    </div>
  );
}

export default DemandeConges;
