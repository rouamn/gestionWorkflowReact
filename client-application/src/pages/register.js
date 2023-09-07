import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import VideoBackground from "../pages/backroundvideo";
import Swal from 'sweetalert2';
import axios from 'axios';

function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [Status, setStatus] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password || !name || !role) {
    
      setMessage("Please enter your name, email, password, and role.");
      return;
    }
  
    try {
      await axios.put("https://localhost:5001/create", {
        name: name,
        email: email,
        password: password,
        role: role,
        Status: "Pending",
      });
 
      Swal.fire(
        'info',
        'Your registration has been submitted and is pending approval. You will receive a notification when your registration is approved or rejected.',
        'info'
      )

      navigate("/");
      
    } catch (error) {
      console.log(error);
     
      setMessage("There was an error registering your account. Please try again.");
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
                <h2
                  className="text-center"
                  style={{ fontWeight: "bold", fontSize: "2.5rem" }}
                >
                  Sign up
                </h2>
                <div className="text-center mb-5">
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "#6c757d",
                      textShadow: "1px 1px #f8f9fa",
                    }}
                    className="mb-0"
                  >
                    Create an account to get started.
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
                      type="name"
                      id="form3Example3"
                      className="form-control"
                      style={{ borderRadius: "20px" }}
                      value={name}
                      placeholder="User name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

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

                  <div className="form-outline mb-4">
                    <select
                      className="form-control"
                      style={{ borderRadius: "20px" }}
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                    >
                      <option value="">Select role</option>
                      <option value="employee">Employee</option>
                      <option value="Responsable RH">Responsable RH</option>
                      <option value="director">Directeur</option>
                    </select>
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
                    Sign up
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-2 text-muted">
                    Already have an account? <Link to="/">Log in</Link>
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
export default Register;