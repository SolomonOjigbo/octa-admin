import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { logo } from "../../assets/images";
import { 
  passwordResetRequestStart, 
  passwordResetRequestSuccess, 
  passwordResetRequestFailure 
} from "../../core/redux/slices/auth";
import { requestPasswordReset } from "../../core/redux/apis/auth";
import { RootState } from "../../core/redux/store"; 

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, passwordResetSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(passwordResetRequestStart());
    try {
      await dispatch(requestPasswordReset({ email }) as any);
      dispatch(passwordResetRequestSuccess());
    } catch (err: any) {
      dispatch(passwordResetRequestFailure(err.message || "Failed to request password reset"));
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper forgot-pass-wrap bg-img">
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <div className="login-userset">
                {/* Logo */}
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src={logo} alt="logo" />
                </div>
                <Link to={all_routes.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt="logo-white" />
                </Link>

                {/* Heading */}
                <div className="login-userheading">
                  <h3>Forgot password?</h3>
                  <h4>
                    If you forgot your password, we’ll email you instructions to reset your password.
                  </h4>
                </div>

                {/* Email Input */}
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                    <ImageWithBasePath src="assets/img/icons/mail.svg" alt="mail-icon" />
                  </div>
                </div>

                {/* Submit */}
                <div className="form-login">
                  <button type="submit" className="btn btn-login" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>

                {/* Success & Error */}
                {passwordResetSuccess && (
                  <div className="text-success mt-2 text-center">
                    Password reset email sent successfully!
                  </div>
                )}
                {error && (
                  <div className="text-danger mt-2 text-center">{error}</div>
                )}

                {/* Links */}
                <div className="signinform text-center mt-3">
                  <h4>
                    Return to
                    <Link to={all_routes.signin} className="hover-a">
                      {" "}login{" "}
                    </Link>
                  </h4>
                </div>

                {/* OR Divider */}
                <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div>

                {/* Social Login */}
                <div className="form-sociallink">
                  <ul className="d-flex justify-content-center">
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
                  <p>Copyright © {new Date().getFullYear()} Teaspoon. All Rights Reserved</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
