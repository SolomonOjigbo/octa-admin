import React, { useEffect, useState } from "react";
import {
  ChevronUp,
  PlusCircle,
  RotateCcw,
  User,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import SettingsSidebar from "../settingssidebar";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/store";
import { setToogleHeader } from "../../../../core/redux/action";
import { getProfile,updateProfile } from "../../../../core/redux/apis/auth";

const GeneralSettings: React.FC = () => {
  const dispatch = useAppDispatch();


  const toggleHeader = useAppSelector((state: any) => state.toggle_header);
  // const selectedUser = useAppSelector(
  //   (state: any) => state.userSettings.selectedUser
  // );
 // const { selectedUser } = useAppSelector((state) => state.auth);
  const { user: selectedUser } = useAppSelector((state) => state.auth);
  useEffect(() => {
  dispatch(getProfile() as any);
}, [dispatch]);

const [form, setForm] = useState<any>({
    firstName: "",
    lastName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const [preview, setPreview] = useState<string>("");

  // 🔹 Prefill from selected user
  useEffect(() => {
    if (selectedUser) {
      setForm({
        firstName: selectedUser.firstName || "",
        lastName: selectedUser.lastName || "",
        name: selectedUser.name || "",
        phone: selectedUser.phone || "",
        email: selectedUser.email || "",
        address: selectedUser.address || "",
        country: selectedUser.country || "",
        state: selectedUser.state || "",
        city: selectedUser.city || "",
        postalCode: selectedUser.postalCode || "",
      });

      setPreview(
        selectedUser.profilePicture ||
          "assets/img/customer/customer5.jpg"
      );
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setPreview(file);
    }
  };

  const handleSubmit = () => {
    dispatch(updateProfile(form) as any);
  };

  const renderRefreshTooltip = (props: any) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );

  const renderCollapseTooltip = (props: any) => (
    <Tooltip id="collapse-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div className="page-wrapper">
      <div className="content settings-content">
        {/* HEADER */}
        <div className="page-header settings-pg-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Settings</h4>
              <h6>Manage your settings on portal</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link to="#">
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>

            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  to="#"
                  className={toggleHeader ? "active" : ""}
                  onClick={() =>
                    dispatch(setToogleHeader(!toggleHeader))
                  }
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="settings-wrapper d-flex">
              <SettingsSidebar />

              <div className="settings-page-wrap">
                <form>
                  <div className="setting-title">
                    <h4>Profile Settings</h4>
                  </div>

                  {/* ===== EMPLOYEE INFO ===== */}
                  <div className="card-title-head">
                    <h6>
                      <span>
                        <User />
                      </span>
                      Employee Information
                    </h6>
                  </div>

                  {/* PROFILE IMAGE */}
                  <div className="profile-pic-upload flex align-items-center">
                    <div className="profile-pic">
                      <span>
                        <PlusCircle /> Profile Photo
                      </span>
                    </div>

                    <div className="new-employee-field">
                      <div className="image-upload">
                        <input type="file" onChange={handleImageChange} />
                        <div className="image-uploads">
                          <img src={preview} alt="preview" />
                          <h4>Change Image</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== BASIC INFO ===== */}
                  <div className="row">
                    {[
                      ["firstName", "First Name"],
                      ["lastName", "Last Name"],
                      ["name", "User Name"],
                      ["phone", "Phone Number"],
                      ["email", "Email"],
                    ].map(([key, label]) => (
                      <div className="col-md-4" key={key}>
                        <div className="mb-3">
                          <label className="form-label">{label}</label>
                          <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ===== ADDRESS ===== */}
                  <div className="card-title-head">
                    <h6>Our Address</h6>
                  </div>

                  <div className="row">
                    {[
                      ["address", "Address"],
                      ["country", "Country"],
                      ["state", "State / Province"],
                      ["city", "City"],
                      ["postalCode", "Postal Code"],
                    ].map(([key, label]) => (
                      <div className="col-md-3" key={key}>
                        <div className="mb-3">
                          <label className="form-label">{label}</label>
                          <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="text-end settings-bottom-btn">
                    <button
                      type="button"
                      className="btn btn-cancel me-2"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;