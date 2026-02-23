import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../core/img/imagewithbasebath";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  ChevronUp,
  RotateCcw,
  Upload,
  X,
} from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../core/redux/store";
import SettingsSideBar from "../settingssidebar";

const CompanySettings: React.FC = () => {
  const dispatch = useDispatch();
  const toggleHeader = useSelector(
    (state: RootState) => state.toggle_header
  );

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

  const handleToggleHeader = () => {
    dispatch(setToogleHeader(!toggleHeader));
  };

  return (
    <div className="page-wrapper">
      <div className="content settings-content">
        {/* Header */}
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
                  id="collapse-header"
                  className={toggleHeader ? "active" : ""}
                  onClick={handleToggleHeader}
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
              <SettingsSideBar />

              {/* Settings Content */}
              <div className="settings-page-wrap">
                <form>
                  <div className="setting-title">
                    <h4>Company Settings</h4>
                  </div>

                  {/* Company Info */}
                  <div className="company-info">
                    <div className="card-title-head">
                      <h6>Company Information</h6>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label">Company Name</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">
                          Company Email Address
                        </label>
                        <input type="email" className="form-control" />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>

                  {/* Company Images */}
                  <div className="company-info company-images">
                    <div className="card-title-head">
                      <h6>Company Images</h6>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <h6>Company Logo</h6>
                        <p>Upload Logo to display on website</p>
                      </div>

                      <div className="image-upload">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>
                            <Upload /> Upload Photo
                          </h4>
                        </div>
                      </div>

                      <div className="ms-auto">
                        <Link to="#">
                          <ImageWithBasePath
                            src="assets/img/logo-small.png"
                            alt="Logo"
                          />
                          <X />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="company-address">
                    <div className="card-title-head">
                      <h6>Address</h6>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Country</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">State</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Postal Code</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="modal-footer-btn mt-4">
                    <button type="button" className="btn btn-cancel me-2">
                      Cancel
                    </button>

                    <Link to="#" className="btn btn-submit">
                      Save Changes
                    </Link>
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

export default CompanySettings;