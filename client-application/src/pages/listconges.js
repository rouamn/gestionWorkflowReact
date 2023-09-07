import React, {  useEffect,useState } from "react";
import Swal from 'sweetalert2';
function ListConges() 
{

    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingDemande, setpendingDemande] = useState([]);
    const [pendingAvance, setpendingAvance] = useState([]);

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

  function handleApproveDemande(userId) {
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
        return fetch(`https://localhost:5001/approveDemande/${userId}`, {
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
       // alert('Demande approved successfully!');
        setpendingDemande((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        window.location.reload(); // Refresh the page to fetch the updated user list
      } else {
        throw new Error('Failed to approve Demande');
      }
    })
    .catch((error) => {
      if (error.message === 'Approval cancelled') {
          Swal.fire('Cancelled', 'he approval has been cancelled.', 'info');
        console.log('The approval has been cancelled.');
      } else {
        console.error(error);
        // Handle other errors here
      }
    });
}
   
   
   function handleRejectDemande(userId) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you want to reject the user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, reject it!',
  })
    .then((result) => {
      if (result.isConfirmed) {
        // Send a request to the server to reject the user with the given userId
        return fetch(`https://localhost:5001/rejectDemande/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        throw new Error('Rejection cancelled');
      }
    })
    .then((response) => {
      if (response.ok) {
        Swal.fire('Rejected!', 'The user has been rejected.', 'success');
        setpendingDemande((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
      } else {
        throw new Error('Failed to reject Demande');
      }
    })
    .catch((error) => {
      if (error.message === 'Rejection cancelled') {
        Swal.fire('Cancelled', 'The rejection has been cancelled.', 'info');
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

  <div className="row mt-4">
    <div className="col">
      <div className="card">
        <div className="card-header">
          <h3>List of Leave Requests</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Commentaire</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDemande.map(request => (
                  <tr key={request.id} className="unread">
                    <td>{request.email}</td>
                    <td>{request.type}</td>
                    <td>{request.dateDebut}</td>
                    <td>{request.dateFin}</td>
                    <td>{request.statut}</td>
                    <td>{request.commentaire}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button className="btn btn-danger" onClick={() => handleRejectDemande(request.id)}>Reject</button>
                        <button className="btn btn-success" onClick={() => handleApproveDemande(request.id)}>Approve</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
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
  
  
export default ListConges;