import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Swal from 'sweetalert2';
function Homedirector() 
{

    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingDemande, setpendingDemande] = useState([]);
    const [pendingAvance, setpendingAvance] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const chartRef = useRef(null);
  
    useEffect(() => {
      fetchUserStatus();
    }, []);
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('https://localhost:5001/users');
        const usersData = response.data;
  
        const approved = usersData.filter((user) => user.status === 'Approved');
        const rejected = usersData.filter((user) => user.status === 'Rejected');
  
        setApprovedUsers(approved);
        setRejectedUsers(rejected);
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    };
  
    useEffect(() => {
      updateChart();
    }, [approvedUsers, rejectedUsers]);
  
    const updateChart = () => {
      const approvedCount = approvedUsers.length;
      const rejectedCount = rejectedUsers.length;
  
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
  
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
  
        const backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'];
        const borderColors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'];
  
        chartRef.current.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Rejected'],
            datasets: [
              {
                label: 'Users',
                data: [approvedCount, rejectedCount],
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                mode: 'index',
              },
            },
          },
        });
      }
    };
    useEffect(() => {
      // Fetch the list of pending users from the server
      fetch('https://localhost:5001/pending')
        .then(response => response.json())
        .then(data => setPendingUsers(data))
        .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        // Fetch the list of pending users from the server
        fetch('https://localhost:5001/pendingDemande')
          .then(response => response.json())
          .then(data => setpendingDemande(data))
          .catch(error => console.error(error));
      }, []);
      useEffect(() => {
        // Fetch the list of pending users from the server
        fetch('https://localhost:5001/pendingAvance')
          .then(response => response.json())
          .then(data => setpendingAvance(data))
          .catch(error => console.error(error));
      }, []);
      function handleApprove(userId) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Are you sure you want to approve the user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, approve it!',
        })
          .then((result) => {
            if (result.isConfirmed) {
              // Send a request to the server to approve the user with the given userId
              return fetch(`https://localhost:5001/approv${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            } else {
              throw new Error('Approval cancelled');
            }
          })
          .then((response) => {
            if (response.ok) {
              Swal.fire('Approved!', 'The user has been approved.', 'success');
              setPendingUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
              );
            } else {
              throw new Error('Failed to approve user');
            }
          })
          .catch((error) => {
            if (error.message === 'Approval cancelled') {
              Swal.fire(
                'Cancelled',
                'The approval has been cancelled.',
                'info'
              );
            } else {
              console.error(error);
              // Handle other errors here
            }
          });
      }
      function handleReject(userId) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Are you sure you want to reject the user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, reject it!',
        })
          .then((result) => {
            if (result.isConfirmed) {
              // Send a request to the server to reject the user with the given userId
              return fetch(`https://localhost:5001/reject/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              throw new Error('Rejection cancelled');
            }
          })
          .then((response) => {
            if (response.ok) {
              Swal.fire('Rejected!', 'The user has been rejected.', 'success');
              setPendingUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
              );
            } else {
              throw new Error('Failed to reject user');
            }
          })
          .catch((error) => {
            if (error.message === 'Rejection cancelled') {
              Swal.fire(
                'Cancelled',
                'The rejection has been cancelled.',
                'info'
              );
            } else {
              console.error(error);
              // Handle other errors here
            }
          });
      }
   
      
      
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
            <span className="b-title">Administrators </span>
          </a>
          <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span /></a>
        </div>
        <div className="navbar-content scroll-div">
          <ul className="nav pcoded-inner-navbar">
            <li className="nav-item pcoded-menu-caption">
            
            </li>
            <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" >
              <a href="/homedirector" className="nav-link "><span className="pcoded-micon"><i className="feather icon-home" /></span><span className="pcoded-mtext">Dashboard</span></a>
          
            </li>
          
    
<li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
              <a href="/listuser" className="nav-link "><span className="pcoded-micon"><i className="feather icon-file-text" /></span><span className="pcoded-mtext">Users List</span></a>
            </li>
       
            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
              <a href="/listconges" className="nav-link "><span className="pcoded-micon"><i className="feather icon-file-text" /></span><span className="pcoded-mtext">Leave requests List</span></a>
            </li>
            <li data-username="Table bootstrap datatable footable" className="nav-item">
              <a href="/listavance" className="nav-link "><span className="pcoded-micon"><i className="feather icon-server" /></span><span className="pcoded-mtext">Advance requests List </span></a>
            </li>
            <li data-username="Table bootstrap datatable footable" className="nav-item">
              <a href="/chats" className="nav-link "><span className="pcoded-micon"><i className="feather icon-server" /></span><span className="pcoded-mtext">Chats</span></a>
            </li>
            
            <li data-username="Charts Morris" className="nav-item"><a href="/charts" className="nav-link "><span className="pcoded-micon"><i className="feather icon-pie-chart" /></span><span className="pcoded-mtext">Chart</span></a></li>
            <li data-username="Calander" className="nav-item"><a href="/calander" className="nav-link "><span className="pcoded-micon"><i className="feather icon-map" /></span><span className="pcoded-mtext">Calander</span></a></li>
        
          </ul>
        </div>
      </div>
    </nav>
      {/* [ navigation menu ] end */}
      {/* [ Header ] start */}
      <header className="navbar pcoded-header navbar-expand-lg navbar-light">
        <div className="m-header">
          <a className="mobile-menu" id="mobile-collapse1" href="javascript:"><span /></a>
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
            <li><a href="javascript:" className="full-screen" onclick="javascript:toggleFullScreen()"><i className="feather icon-maximize" /></a></li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle" href="javascript:" data-toggle="dropdown">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="javascript:">Action</a></li>
                <li><a className="dropdown-item" href="javascript:">Another action</a></li>
                <li><a className="dropdown-item" href="javascript:">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="main-search">
                <div className="input-group">
                  <input type="text" id="m-search" className="form-control" placeholder="Search . . ." />
                  <a href="javascript:" className="input-group-append search-close">
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
                <a className="dropdown-toggle" href="javascript:" data-toggle="dropdown"><i className="icon feather icon-bell" /></a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                    <div className="float-right">
                      <a href="javascript:" className="m-r-10">mark as read</a>
                      <a href="javascript:">clear all</a>
                    </div>
                  </div>
                  <ul className="noti-body">
                    <li className="n-title">
                      <p className="m-b-0">NEW</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img className="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                        <div className="media-body">
                          <p><strong>John Doe</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />30 min</span></p>
                          <p>New ticket Added</p>
                        </div>
                      </div>
                    </li>
                    <li className="n-title">
                      <p className="m-b-0">EARLIER</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img className="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                        <div className="media-body">
                          <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />30 min</span></p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img className="img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" />
                        <div className="media-body">
                          <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />30 min</span></p>
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
                <a href="javascript:" className="dropdown-toggle" data-toggle="dropdown">
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
               
                    <li><a href="javascript:" className="dropdown-item"><i className="feather icon-user" /> Profile</a></li>
               
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
      {/* [ Header ] end */}
      {/* [ Main Content ] start */}
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              {/* [ breadcrumb ] start */}
              {/* [ breadcrumb ] end */}
              <div className="main-body">
            
                  {/* [ Main Content ] start */}
                
                    {/*[ daily sales section ] start*/}
                 
                    {/*[ daily sales section ] end*/}
                    {/*[ Monthly  sales section ] starts*/}
                 
                    {/*[ Monthly  sales section ] end*/}
                    {/*[ year  sales section ] starts*/}
                  
                    {/*[ year  sales section ] end*/}
                    {/*[ Recent Users ] start*/}
                    <div className="container">
  <div className="row">
    <div className="col">
      <div className="card">
        <div className="card-header">
          <h3>Recent Users</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user.id} className="unread">
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <td>
                          <a href="#!" onClick={() => handleReject(user.id)} className="label theme-bg2 text-white f-12">
                            Reject
                          </a>
                          <a href="#!" onClick={() => handleApprove(user.id)} className="label theme-bg text-white f-12">
                            Approve
                          </a>
                        </td>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-block border-bottom">
          <div className="row d-flex align-items-center">
            <div className="col-auto">
              <i className="feather icon-zap f-30 text-c-green"></i>
            </div>
            <div className="col">
              <h3 className="f-w-300">235</h3>
              <span className="d-block text-uppercase">TOTAL Users</span>
            </div>
          </div>
        </div>
        <div className="card-block">
          <div className="row d-flex align-items-center">
            <div className="col-auto">
              <i className="feather icon-map-pin f-30 text-c-blue"></i>
            </div>
            <div className="col">
              <h3 className="f-w-300">26</h3>
              <span className="d-block text-uppercase">TOTAL LOCATIONS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4 col-md-6">
      <div className="card card-event">
        <div className="card-block">
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">Upcoming Event</h5>
            </div>
            <div className="col-auto">
              <label className="label theme-bg2 text-white f-14 f-w-400 float-right">34%</label>
            </div>
          </div>
          <h2 className="mt-3 f-w-300">
            45<sub className="text-muted f-14">Competitors</sub>
          </h2>
          <h6 className="text-muted mt-4 mb-0">You can participate in the event</h6>
          <i className="fab fa-angellist text-c-purple f-50"></i>
        </div>
      </div>
      <div className="card">
        <div className="card-block border-bottom">
          <div className="row d-flex align-items-center">
            <div className="col-auto">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>             {/*[ Recent Users ] end*/}
                    {/* [ statistics year chart ] start */}
                  
                    {/* [ statistics year chart ] end */}
                    {/*[social-media section] start*/}
                    
               
                    {/*[social-media section] end*/}
                    {/* [ rating list ] starts*/}
                   
                    {/* [ rating list ] end*/}
                   
                 
                  {/* [ Main Content ] end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
       
  
  
      
  
  
         );
   
  }
  
  
export default Homedirector;