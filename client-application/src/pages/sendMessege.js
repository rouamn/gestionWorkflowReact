import React, { useState,useEffect  } from 'react';
import { db } from '../firebase';
import axios from 'axios';
function SendMessage({ scroll, userId }) {
  const [msg, setMsg] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };


  const getUsers = async () => {
    try {
      const response = await axios.get('https://localhost:5001/users');
      const usersData = response.data;
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.trim() !== '') {
      const newMessage = {
        sender: 'You',
        content: msg,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMsg('');
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
{/* [ Main Content ] start */}
<div className="container">
  <div className="row">
    <div className="col-xl-3 col-md-2"></div> {/* Empty column for spacing */}
    <div className="col-xl-6 col-md-8">
      <div className="card card-lg"> {/* Updated class to "card-lg" */}
        <div className="card-body card-lg"> {/* Updated class to "card-lg" */}
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              {searchQuery && filteredUsers.length > 0 ? (
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.id}
                      className={`clearfix ${
                        selectedUser && selectedUser.id === user.id ? 'active' : ''
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <img src={user.avatar} alt="avatar" />
                      <div className="about">
                        <div className="name">{user.name}</div>
                        <div className="status">
                          <i className={`fa fa-circle ${user.online ? 'online' : 'offline'}`} />
                          {user.online ? 'online' : `last seen ${user.lastSeen}`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {selectedUser && (
              <div className="chat
                ">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                        <img src={selectedUser.avatar} alt="avatar" />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0">{selectedUser.name}</h6>
                        <small>Last seen: {selectedUser.lastSeen}</small>
                      </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                      <a href="javascript:void(0);" className="btn btn-outline-secondary">
                        <i className="fa fa-camera" />
                      </a>
                      <a href="javascript:void(0);" className="btn btn-outline-primary">
                        <i className="fa fa-image" />
                      </a>
                      <a href="javascript:void(0);" className="btn btn-outline-info">
                        <i className="fa fa-cogs" />
                      </a>
                      <a href="javascript:void(0);" className="btn btn-outline-warning">
                        <i className="fa fa-question" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    {messages.map((message, index) => (
                      <li
                        key={index}
                        className={`clearfix ${
                          message.sender === 'You' ? 'my-message' : 'other-message'
                        }`}
                      >
                        <div className="message-data">
                          <span className="message-data-time">{message.timestamp}</span>
                          <span className="message-data-name">{message.sender}</span>
                        </div>
                        <div className="message">{message.content}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chat-message">
                  <form onSubmit={sendMessage}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-md-2"></div> {/* Empty column for spacing */}
  </div>
</div>
    </div>
    



    
  );
}

export default SendMessage;