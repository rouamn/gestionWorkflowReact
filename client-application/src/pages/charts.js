import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Charts = () => {
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
            <span className="b-title">Director page </span>
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
          
            <li data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds" className="nav-item pcoded-hasmenu">
  <a href="javascript:" className="nav-link " >
    <span className="pcoded-micon"><i className="feather icon-box" /></span>
    <span className="pcoded-mtext">Users</span>
  </a>
  <ul className="pcoded-submenu" style={{display: 'block'}}>
    <li><a href="/listuser">Users List</a></li>
    <li><a href="/adduser">Add new users</a></li>
  </ul>
</li>
       
            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
              <a href="/demadeConges" className="nav-link "><span className="pcoded-micon"><i className="feather icon-file-text" /></span><span className="pcoded-mtext">Leave request</span></a>
            </li>
            <li data-username="Table bootstrap datatable footable" className="nav-item">
              <a href="/demnadeAvance" className="nav-link "><span className="pcoded-micon"><i className="feather icon-server" /></span><span className="pcoded-mtext">Advance request</span></a>
            </li>
            
            <li data-username="Charts Morris" className="nav-item"><a href="chart-morris.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-pie-chart" /></span><span className="pcoded-mtext">Chart</span></a></li>
            <li data-username="Calander" className="nav-item"><a href="/calander" className="nav-link "><span className="pcoded-micon"><i className="feather icon-map" /></span><span className="pcoded-mtext">Calander</span></a></li>
            <li data-username="chat" className="nav-item"><a href="/chats" className="nav-link "><span className="pcoded-micon"><i className="feather icon-map" /></span><span className="pcoded-mtext">Chat </span></a></li>
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
               
 


               <div className="card">
      <div className="card-block border-bottom">
        <div className="row d-flex align-items-center">
          <div className="col-auto">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>           {/*[ daily sales section ] end*/}
                    {/*[ Monthly  sales section ] starts*/}
                 
                    {/*[ Monthly  sales section ] end*/}
                    {/*[ year  sales section ] starts*/}
                  
                    {/*[ year  sales section ] end*/}
                    {/*[ Recent Users ] start*/}
     
                    {/*[ Recent Users ] end*/}
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
  
  
export default Charts;