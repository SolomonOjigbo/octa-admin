import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/redux/store";
import { getProfile, updateProfile } from "../../core/redux/apis/auth";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    name: "",
    password: "",
  });

  const [preview, setPreview] = useState<string>("");

  // 🔹 Load profile
  useEffect(() => {
    dispatch(getProfile() as any);
  }, [dispatch]);

  // 🔹 Prefill form
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        name: user.name || "",
        password: "",
      });

      setPreview(
        user.profilePicture || "assets/img/customer/customer5.jpg"
      );
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setPreview(file);
    }
  };

  const handleSubmit = () => {
    dispatch(updateProfile(form) as any);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Profile</h4>
            <h6>User Profile</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            {/* ===== PROFILE HEADER ===== */}
            <div className="profile-set">
              <div className="profile-head"></div>

              <div className="profile-top">
                <div className="profile-content">
                  <div className="profile-contentimg">
                    <ImageWithBasePath
                      src={preview}
                      alt="img"
                    />

                    <div className="profileupload">
                      <input type="file" onChange={handleImageChange} />
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/edit-set.svg"
                          alt="edit"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="profile-contentname">
                    <h2>
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <h4>Update your photo and personal details.</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== FORM ===== */}
            <div className="row">

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>User Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Password</label>
                  <div className="pass-group">
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <span className="fas fa-eye-slash toggle-password" />
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="col-12">
                <button
                  onClick={handleSubmit}
                  className="btn btn-submit me-2"
                >
                  Submit
                </button>

                <Link to="#" className="btn btn-cancel">
                  Cancel
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;