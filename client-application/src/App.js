import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from "./pages/home";
import Reset from "./pages/reset";
import Listuser from "./pages/listuser";
import Adduser from "./pages/adduser";
import DemandeAvance from "./pages/demandeAvance";
import DemandeConges from "./pages/demadeConges";
import Register  from "./pages/register";
import  Calander  from "./pages/calander";
import HomeE from "./pages/homeE";
import Homedirector from "./pages/homedirector"; 
import Chat from "./pages/chats"; 
import Charts from "./pages/charts"; 
import ListConges from "./pages/listconges";
import ListAvances from "./pages/listavance";
import VideoBackground  from './pages/backroundvideo';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listuser" element={<Listuser/>} />
        <Route path="/adduser" element={<Adduser/>} />
        <Route path="/demnadeAvance" element={<DemandeAvance/>} />
        <Route path="/demadeConges" element={<DemandeConges/>} />
        <Route path="/calander" element={<Calander/>} />
        <Route path="/homeE" element={<HomeE/>} />
        <Route path="/homedirector" element={<Homedirector/>} />
        <Route path="/chats" element={<Chat/>} />
        <Route path="/charts" element={<Charts/>} />
        <Route path="/listavance" element={<ListAvances/>} />
        <Route path="/listconges" element={<ListConges/>} />
      </Routes>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
     
      setMessage("Please enter your email and password.");
      return;
    }
  
    try {
      const response = await axios.post("https://localhost:5001/login", {
        email: email,
        password: password,
      });
  
      // Retrieve the user's registration data
      
    // Retrieve the user's ID from the response
    const userId = response.data.id;

    // Store the user ID in local storage
    localStorage.setItem("userId", userId);

      const registrationResponse = await axios.get(`https://localhost:5001/users/${userId}`);
      const registrationStatus = registrationResponse.data.status;
      const userRole = registrationResponse.data.role;
  
      // Check the user's registration status
      if (registrationStatus !== "Approved") {
        alert("Your registration is pending approval or has been rejected. Please try again later.");
        return;
      }
  
   
  
      // Redirect the user based on their role
      if (userRole === "Responsable RH") {
        navigate("/home");
      } else if (userRole === "director") {
        navigate("/homedirector");
      } else {
        navigate("/homeE");
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    } catch (error) {
      console.log(error);
        // Display SweetAlert2 error alert

        setMessage("email or password invalide.");
    }
  };
  return (
    <>
      <VideoBackground />
      <section
        className="d-flex justify-content-center align-items-center"
        style={{
          paddingTop: "110px",
          height: "calc(100vh - 110px)",
        }}
      >
        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(30px)",
            width: "550px",
            maxWidth: "100%",
            borderRadius: "10px",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12">
                <div className="text-center mb-5">
                  <h2
                    className="mb-3"
                    style={{ fontWeight: "bold", fontSize: "2.5rem" }}
                  >
                    Welcome back!
                  </h2>
            <p
                    style={{
                      fontSize: "1.2rem",
                      color: "#6c757d",
                      textShadow: "1px 1px #f8f9fa",
                    }}
                  >
                    Log in to access your account.
                  </p>
                </div>
                {message && (
            <div className="alert alert-success mt-3">
              {message}
            </div>
          )}
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      style={{ borderRadius: "20px" }}
                      value={email}
                      placeholder="Email address"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                   
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      style={{ borderRadius: "20px" }}
                      value={password}
                      placeholder="Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <div className="form-check form-switch me-2 flex-row-reverse">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="form2Example33"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example33"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    }}
                  >
                    Login
                  </button>
                </form>
                <div className="text-center">
                    <p className="mb-2 text-muted">
                      Forgot password? <Link to="/reset">Reset it</Link>
                    </p>
                  </div>
                <div className="text-center">
                  <p className="mb-2 text-muted">
                  Don’t have an account? <Link to="/register"> Signup</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;