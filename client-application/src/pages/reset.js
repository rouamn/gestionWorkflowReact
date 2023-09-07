import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import VideoBackground  from '../pages/backroundvideo';

function Reset() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email ) {
      alert('Please enter your email ');
      return;
    }

    console.log(`Email: ${email}`);
    // You can add your login logic here

    setIsSubmitted(true);
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
                    Reset Password
                  </h2>
                </div>

                {!isSubmitted ? (
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

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                      }}
                    >
                      Reset Password
                    </button>
                  </form>
                ) : (
                  <>
                    <p className="text-center">
                      An email has been sent to {email} with instructions on how to reset your password.
                    </p>
                    <div className="text-center">
                      <Link
                        to="/"
                        className="btn btn-link"
                        style={{
                          textDecoration: "none",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#007bff",
                        }}
                      >
                        Back to login
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reset;