import React from "react";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import Map from "feather-icons-react/build/IconComponents/Map";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import SettingsSideBar from "../settingssidebar";
import ReactTagsInput from "../reacttaginputs";

import { setToogleHeader } from "../../../../core/redux/action";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/store";

type OptionType = {
  value: string;
  label: string;
};

const LocalizationSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const toggleHeader = useAppSelector((state) => state.toggle_header);

  // Tooltips
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

  // Options
  const languageOptions: OptionType[] = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
  ];

  const timezoneOptions: OptionType[] = [
    { value: "utc5:30", label: "UTC 5:30" },
    { value: "utc+11:00", label: "(UTC+11:00) INR" },
  ];

  const dateOptions: OptionType[] = [
    { value: "22-Jul-2023", label: "22 Jul 2023" },
    { value: "Jul-22-2023", label: "Jul 22 2023" },
  ];

  const timeFormatOptions: OptionType[] = [
    { value: "12-hours", label: "12 Hours" },
    { value: "24-hours", label: "24 Hours" },
  ];

  const yearOptions: OptionType[] = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

  const monthOptions: OptionType[] = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
  ];

  const countryOptions: OptionType[] = [
    { value: "India", label: "India" },
    { value: "USA", label: "United States Of America" },
  ];

  const symbolOptions: OptionType[] = [
    { value: "$", label: "$" },
    { value: "€", label: "€" },
  ];

  const permissionOptions: OptionType[] = [
    { value: "allow", label: "Allow All Country" },
    { value: "deny", label: "Deny All Country" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content settings-content">
        {/* Header */}
        <div className="page-header settings-pg-header">
          <div className="page-title">
            <h4>Settings</h4>
            <h6>Manage your settings on portal</h6>
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
                  onClick={() => dispatch(setToogleHeader(!toggleHeader))}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="settings-wrapper d-flex">
          <SettingsSideBar />

          <div className="settings-page-wrap">
            <form>
              <div className="setting-title">
                <h4>Localization</h4>
              </div>

              {/* BASIC INFO */}
              <div className="company-info">
                <div className="card-title-head">
                  <h6>Basic Information</h6>
                </div>

                <div className="localization-info">

                  {/* Language */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <h6>Language</h6>
                      <p>Select Language of the Website</p>
                    </div>

                    <div className="col-sm-4">
                      <Select<OptionType>
                        options={languageOptions}
                        placeholder="Select Language"
                      />
                    </div>
                  </div>

                  {/* Timezone */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <h6>Timezone</h6>
                      <p>Select Time zone</p>
                    </div>

                    <div className="col-sm-4">
                      <Select<OptionType>
                        options={timezoneOptions}
                        placeholder="Select Timezone"
                      />
                    </div>
                  </div>

                  {/* Date Format */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <h6>Date Format</h6>
                    </div>

                    <div className="col-sm-4">
                      <Select<OptionType>
                        options={dateOptions}
                        placeholder="Select Date Format"
                      />
                    </div>
                  </div>

                  {/* Time Format */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <h6>Time Format</h6>
                    </div>

                    <div className="col-sm-4">
                      <Select<OptionType>
                        options={timeFormatOptions}
                        placeholder="Select Time Format"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CURRENCY */}
              <div className="company-info">
                <div className="card-title-head">
                  <h6>Currency Settings</h6>
                </div>

                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <h6>Currency</h6>
                  </div>

                  <div className="col-sm-4">
                    <Select<OptionType>
                      options={countryOptions}
                      placeholder="Select Country"
                    />
                  </div>
                </div>

                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <h6>Currency Symbol</h6>
                  </div>

                  <div className="col-sm-4">
                    <Select<OptionType>
                      options={symbolOptions}
                      placeholder="Select Symbol"
                    />
                  </div>
                </div>
              </div>

              {/* COUNTRY SETTINGS */}
              <div className="company-info">
                <div className="card-title-head">
                  <h6>
                    <Map /> Country Settings
                  </h6>
                </div>

                <Select<OptionType>
                  options={permissionOptions}
                  placeholder="Allow All Country"
                />
              </div>

              {/* FILE SETTINGS */}
              <div className="company-info">
                <div className="card-title-head">
                  <h6>
                    <Map /> File Settings
                  </h6>
                </div>

                <ReactTagsInput />

                <div className="mt-3">
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={5000}
                  />
                  <span>MB</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="modal-footer-btn">
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
  );
};

export default LocalizationSettings;