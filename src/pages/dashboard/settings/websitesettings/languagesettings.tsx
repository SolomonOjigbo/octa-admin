import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../../core/redux/action";
import {
  ChevronUp,
  Download,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../core/redux/store";
import ImageWithBasePath from "../../../../core/img/imagewithbasebath";
import Select, { SingleValue } from "react-select";
import { Filter } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SettingsSideBar from "../settingssidebar";
import { all_routes } from "../../../../Router/all_routes";

type LanguageOption = {
  value: string;
  label: string;
};

const LanguageSettings: React.FC = () => {
  const route = all_routes;

  const dispatch = useDispatch();
  const toggleHeader = useSelector(
    (state: RootState) => state.toggle_header
  );

  const languageOptions: LanguageOption[] = [
    { value: "selectLanguage", label: "Select Language" },
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "chinese", label: "Chinese" },
  ];

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

  const renderTooltip = (props: any) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );

  const renderExcelTooltip = (props: any) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );

  const renderPrinterTooltip = (props: any) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const handleLanguageChange = (option: SingleValue<LanguageOption>) => {
    console.log(option);
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
              <SettingsSideBar />

              <div className="settings-page-wrap w-50">
                <div className="setting-title">
                  <h4>Language</h4>
                </div>

                {/* Top Controls */}
                <div className="page-header justify-content-end">
                  <ul className="table-top-head me-auto">
                    <li>
                      <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <Link to="#">
                          <ImageWithBasePath
                            src="assets/img/icons/pdf.svg"
                            alt="pdf"
                          />
                        </Link>
                      </OverlayTrigger>
                    </li>

                    <li>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderExcelTooltip}
                      >
                        <Link to="#">
                          <ImageWithBasePath
                            src="assets/img/icons/excel.svg"
                            alt="excel"
                          />
                        </Link>
                      </OverlayTrigger>
                    </li>

                    <li>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderPrinterTooltip}
                      >
                        <Link to="#">
                          <i className="feather-printer" />
                        </Link>
                      </OverlayTrigger>
                    </li>
                  </ul>

                  <div className="page-btn d-flex align-items-center ms-0">
                    <div className="select-language">
                      <Select
                        options={languageOptions}
                        className="select"
                        placeholder="Select Language"
                        onChange={handleLanguageChange}
                      />
                    </div>

                    <Link to="#" className="btn btn-added ms-3">
                      Add Translation
                    </Link>
                  </div>
                </div>

                {/* Table */}
                <div className="card table-list-card">
                  <div className="card-body">
                    <div className="table-top">
                      <div className="search-set">
                        <Link to="#" className="btn btn-searchset">
                          <i className="feather-search" />
                        </Link>
                      </div>

                      <div className="search-path">
                        <Link className="btn btn-secondary" to="#">
                          <Filter className="me-1" />
                          Import Sample
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table datanew">
                        <thead>
                          <tr>
                            <th>Language</th>
                            <th>Code</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>English</td>
                            <td>en</td>
                            <td>
                              <span className="badge badge-linesuccess">
                                Active
                              </span>
                            </td>
                            <td>
                              <Link
                                onClick={showConfirmationAlert}
                                to="#"
                                className="text-danger"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>Arabic</td>
                            <td>ar</td>
                            <td>
                              <span className="badge badge-linedanger">
                                Inactive
                              </span>
                            </td>
                            <td>
                              <Link
                                onClick={showConfirmationAlert}
                                to="#"
                                className="text-danger"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* End Table */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;