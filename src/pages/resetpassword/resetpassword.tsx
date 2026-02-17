import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { logo } from "../../assets/images";
import { all_routes } from "../../Router/all_routes";
//import { resetPassword } from "../../../api/auth";
import { resetPassword } from "../../core/redux/apis/auth";
// import {
//   resetPasswordStart,
//   resetPasswordSuccess,
//   resetPasswordFailure,
// } from "../../../slices/auth";
import { 
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../../core/redux/slices/auth";
import { RootState } from "../../core/redux/store"; 

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Get token from URL query
  const token = searchParams.get("token") || "";

  const { loading, error, passwordResetSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(resetPasswordFailure("Passwords do not match"));
      return;
    }

    dispatch(resetPasswordStart());
    try {
      await dispatch(
        resetPassword({ token, password }) as any
      );
      dispatch(resetPasswordSuccess());
      // Optionally redirect to login after 2s
      setTimeout(() => {
        navigate(all_routes.signin);
      }, 2000);
    } catch (err: any) {
      dispatch(resetPasswordFailure(err.message || "Failed to reset password"));
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper reset-pass-wrap bg-img">
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
                  <h3>Reset password?</h3>
                  <h4>Enter New Password &amp; Confirm Password to get inside</h4>
                </div>

                {/* New Password */}
                <div className="form-login">
                  <label>New Password</label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter new password"
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-login">
                  <label>Confirm New Password</label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm new password"
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>

                {/* Submit */}
                <div className="form-login">
                  <button type="submit" className="btn btn-login" disabled={loading}>
                    {loading ? "Resetting..." : "Change Password"}
                  </button>
                </div>

                {/* Success & Error Messages */}
                {passwordResetSuccess && (
                  <div className="text-success mt-2 text-center">
                    Password reset successfully! Redirecting to login...
                  </div>
                )}
                {error && (
                  <div className="text-danger mt-2 text-center">{error}</div>
                )}

                {/* Return to login */}
                <div className="signinform text-center mt-3">
                  <h4>
                    Return to
                    <Link to={all_routes.signin} className="hover-a">
                      {" "}login{" "}
                    </Link>
                  </h4>
                </div>

                {/* Footer */}
                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>
                    Copyright © {new Date().getFullYear()} Teaspoon. All rights reserved
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

export default ResetPassword;
