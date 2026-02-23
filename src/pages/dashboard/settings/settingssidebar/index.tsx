import React, { useState } from "react";
import Scrollbars, {
  ScrollbarProps,
} from "react-custom-scrollbars-2";
import { all_routes } from "../../../../Router/all_routes";
import { Link, useLocation } from "react-router-dom";
import {
  Airplay,
  Archive,
  Server,
  Settings,
} from "feather-icons-react/build/IconComponents";
import { CreditCard, Layout } from "react-feather";

const SettingsSideBar: React.FC<ScrollbarProps> = (props) => {
  const route = all_routes;
  const location = useLocation();

  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] =
    useState<boolean>(false);
  const [isWebsiteSettingsOpen, setIsWebsiteSettingsOpen] =
    useState<boolean>(false);
  const [isAppSettingsOpen, setIsAppSettingsOpen] =
    useState<boolean>(false);
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] =
    useState<boolean>(false);
  const [isFinancialSettingsOpen, setIsFinancialSettingsOpen] =
    useState<boolean>(false);
  const [isOtherSettingsOpen, setIsOtherSettingsOpen] =
    useState<boolean>(false);

  const toggleGeneralSettings = () => {
    setIsGeneralSettingsOpen((prev) => !prev);
    setIsWebsiteSettingsOpen(false);
  };

  const toggleWebsiteSettings = () => {
    setIsWebsiteSettingsOpen((prev) => !prev);
    setIsGeneralSettingsOpen(false);
  };

  const toggleAppSettings = () =>
    setIsAppSettingsOpen((prev) => !prev);

  const toggleSystemSettings = () =>
    setIsSystemSettingsOpen((prev) => !prev);

  const toggleFinancialSettings = () =>
    setIsFinancialSettingsOpen((prev) => !prev);

  const toggleOtherSettings = () =>
    setIsOtherSettingsOpen((prev) => !prev);

  return (
    <div>
      <div
        className="sidebars settings-sidebar theiaStickySidebar"
        id="sidebar2"
      >
        <div className="sidebar-inner slimscroll">
          <Scrollbars
            style={{ width: 255, height: 800 }}
            autoHide
            autoHeight
            autoHeightMin={400}
            {...props}
          >
            <div id="sidebar-menu5" className="sidebar-menu">
              <ul>
                <li className="submenu-open">
                  <ul>
                    {/* ===== GENERAL SETTINGS ===== */}
                    <li
                      className={`submenu ${
                        isGeneralSettingsOpen
                          ? "active subdrop"
                          : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleGeneralSettings}>
                        <Settings />
                        <span>General Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul>
                        <li>
                          <Link
                            to={route.generalsettings}
                            className={
                              location.pathname ===
                              route.generalsettings
                                ? "active"
                                : ""
                            }
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.securitysettings}
                            className={
                              location.pathname ===
                              route.securitysettings
                                ? "active"
                                : ""
                            }
                          >
                            Security
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            to={route.notification}
                            className={
                              location.pathname ===
                              route.notification
                                ? "active"
                                : ""
                            }
                          >
                            Notifications
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link
                            to={route.connectedapps}
                            className={
                              location.pathname ===
                              route.connectedapps
                                ? "active"
                                : ""
                            }
                          >
                            Connected Apps
                          </Link>
                        </li> */}
                      </ul>
                    </li>

                    {/* ===== WEBSITE SETTINGS ===== */}
                    <li
                      className={`submenu ${
                        isWebsiteSettingsOpen
                          ? "active subdrop"
                          : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleWebsiteSettings}>
                        <Airplay />
                        <span>Website Settings</span>
                        <span className="menu-arrow" />
                      </Link>

                      <ul
                        style={{
                          display: isWebsiteSettingsOpen
                            ? "block"
                            : "none",
                        }}
                      >
                        {/* <li>
                          <Link
                            to={route.systemsettings}
                            className={
                              location.pathname ===
                              route.systemsettings
                                ? "active"
                                : ""
                            }
                          >
                            System Settings
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to={route.companysettings}
                            className={
                              location.pathname ===
                              route.companysettings
                                ? "active"
                                : ""
                            }
                          >
                            Company Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.localizationsettings}
                            className={
                              location.pathname ===
                              route.localizationsettings
                                ? "active"
                                : ""
                            }
                          >
                            Localization
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* ===== APP SETTINGS ===== */}
                    {/* <li
                      className={`submenu ${
                        isAppSettingsOpen ? "subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleAppSettings}>
                        <Archive />
                        <span>App Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                      <ul
                        style={{
                          display: isAppSettingsOpen
                            ? "block"
                            : "none",
                        }}
                      >
                        <li>
                          <Link
                            to={route.invoicesettings}
                            className={
                              location.pathname ===
                              route.invoicesettings
                                ? "active"
                                : ""
                            }
                          >
                            Invoice
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={route.printersettings}
                            className={
                              location.pathname ===
                              route.printersettings
                                ? "active"
                                : ""
                            }
                          >
                            Printer
                          </Link>
                        </li>
                      </ul>
                    </li> */}

                    {/* ===== SYSTEM SETTINGS ===== */}
                    {/* <li
                      className={`submenu ${
                        isSystemSettingsOpen ? "subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleSystemSettings}>
                        <Server />
                        <span>System Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                    </li> */}

                    {/* ===== FINANCIAL SETTINGS ===== */}
                    {/* <li
                      className={`submenu ${
                        isFinancialSettingsOpen ? "subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleFinancialSettings}>
                        <CreditCard />
                        <span>Financial Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                    </li> */}

                    {/* ===== OTHER SETTINGS ===== */}
                    {/* <li
                      className={`submenu ${
                        isOtherSettingsOpen ? "subdrop" : ""
                      }`}
                    >
                      <Link to="#" onClick={toggleOtherSettings}>
                        <Layout />
                        <span>Other Settings</span>
                        <span className="menu-arrow" />
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default SettingsSideBar;