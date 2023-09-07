
  import React, { useEffect, useState } from "react";
  import FullCalendar from "@fullcalendar/react";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";

  import { req } from 'superagent';

  import Swal from 'sweetalert2';
  import axios from 'axios';
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  
  function Calander() {
    const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!userId) {
          alert('User ID is missing. Please log in again.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const demandeResponse = await axios.get(
    
          `https://localhost:5001/approveDemande/${userId}`,
          config
        );
        const congeResponse = await axios.get(
          `https://localhost:5001/user/${userId}/demandeconge`,
       
          config
        );

        const demandeEventData = demandeResponse.data;
        const congeEventData = congeResponse.data;

        const formattedDemandeCongeEvents = formatEvents(
          demandeEventData,
          'demande_conge'
        );
        const formattedDemandeAvanceEvents = formatEvents(
          demandeEventData,
          'demande_avance'
        );
        const formattedCongeEvents = formatEvents(congeEventData, 'conge');

        setEvents([
          ...formattedDemandeCongeEvents,
          ...formattedDemandeAvanceEvents,
          ...formattedCongeEvents,
        ]);
      } catch (error) {
        // Handle error
      }
    };

    fetchEvents();
  }, []);

  const formatEvents = (eventData, eventType) => {
    return eventData
      .filter((event) => event.type === eventType)
      .map((event) => ({
        id: event.id,
        title: event.title,
        start: event.date, // Assuming the event has a "date" property
      }));
  };

  const handleDateClick = async (dateClickInfo) => {
    const { value: eventTitle } = await Swal.fire({
      title: 'Enter event title',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
    });

    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: dateClickInfo.dateStr,
      };

      // Save the new event to your backend or wherever you're storing the events
      // ...

      // Update the events in state to include the new event
      setEvents([...events, newEvent]);
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
    <div className="container d-flex justify-content-end align-items-center">
      <div className="card rounded p-8" style={{ width: '900px' }}>
        <div className="card-body">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            dateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  </div>
  );
}

export default Calander;