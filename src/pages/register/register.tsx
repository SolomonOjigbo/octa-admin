import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import { logo } from "../../assets/images";

const Register: React.FC = () => {
  const route = all_routes;

    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper register-wrap bg-img">
          <div className="login-content">
            <form action="signin">
              <div className="login-userset">

                <div className="login-logo logo-normal">
                  <ImageWithBasePath src={logo} alt="Logo" />
                </div>

                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath
                    src="assets/img/logo-white.png"
                    alt="White Logo"
                  />
                </Link>

                <div className="login-userheading">
                  <h3>Register</h3>
                  <h4>Create New Teaspoon Account</h4>
                </div>

                {/* Name */}
                <div className="form-login">
                  <label>Name</label>
                  <div className="form-addons">
                    <input type="text" className="form-control" />
                    <ImageWithBasePath
                      src="assets/img/icons/user-icon.svg"
                      alt="User Icon"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-login">
                  <label>Email Address</label>
                  <div className="form-addons">
                    <input type="email" className="form-control" />
                    <ImageWithBasePath
                      src="assets/img/icons/mail.svg"
                      alt="Mail Icon"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-login">
                  <label>Password</label>
                  <div className="pass-group">
                    <input type={showPassword ? "text" : "password"} className="pass-input" />
                     <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      className={`fas ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-login">
                  <label>Confirm Password</label>
                  <div className="pass-group">
                    <input type={showPassword ? "text" : "password"} className="pass-inputs" />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      className={`fas ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-sm-8">
                      <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        I agree to the{" "}
                        <Link to="#" className="hover-a">
                          Terms & Privacy
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="form-login">
                  <Link to="/" className="btn btn-login">
                    Sign Up
                  </Link>
                </div>

                {/* Signin Link */}
                <div className="signinform">
                  <h4>
                    Already have an account?{" "}
                    <Link to={route.signin} className="hover-a">
                      Sign In Instead
                    </Link>
                  </h4>
                </div>

                {/* Social */}
                {/* <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div> */}

                <div className="form-sociallink">
                  <ul className="d-flex">
                    <li>
                      <Link to="#" className="facebook-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/facebook-logo.svg"
                          alt="Facebook"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/google.png"
                          alt="Google"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="apple-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/apple-logo.svg"
                          alt="Apple"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>
                    Copyright © {new Date().getFullYear()} Teaspoon. All Rights Reserved
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;