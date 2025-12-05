import React, { useState, Fragment } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import { SidebarDataPat } from "../../core/json/sidebar_data_pat";
import HorizontalSidebar from "./horizontalSidebar";
import CollapsedSidebar from "./collapsedSidebar";

// =========================
// Helpers
// =========================
const collectLinks = (submenuItems: any[]): string[] => {
  const links: string[] = [];

  submenuItems.forEach((item) => {
    links.push(item.link);

    if (item.submenu && item.submenuItems) {
      item.submenuItems.forEach((sub: any) => links.push(sub.link));
    }
  });

  return links;
};

// =========================
// Submenu Level 3
// =========================
const SubMenuLevel3 = ({ items, location }: any) => {
  return (
    <ul>
      {items.map((subItem: any, index: number) => {
        const isActive = subItem.link === location.pathname;

        return (
          <li key={index}>
            <Link className={isActive ? "active" : ""} to={subItem.link}>
              {subItem.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// =========================
// Submenu Level 2
// =========================
const SubMenuLevel2 = ({
  item,
  subsidebar,
  toggleSubsidebar,
  location,
}: any) => {
  const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;

  const isActive =
    item.link === location.pathname ||
    item.submenuItems?.some((i: any) => i.link === location.pathname);

  return (
    <li className="submenu submenu-two">
      <Link
        to={item.link}
        onClick={() => toggleSubsidebar(item.label)}
        className={isActive ? "active" : ""}
      >
        {item.label}
        {hasSubmenu && <span className="menu-arrow" />}
      </Link>

      {hasSubmenu && subsidebar === item.label && (
        <SubMenuLevel3 items={item.submenuItems} location={location} />
      )}
    </li>
  );
};

// =========================
// Submenu Level 1
// =========================
const SubMenuLevel1 = ({
  title,
  subOpen,
  toggleSidebar,
  subsidebar,
  toggleSubsidebar,
  location,
}: any) => {
  const links = collectLinks(title.submenuItems ?? []);
  const isActive = links.includes(location.pathname);

  return (
    <li className="submenu">
      <Link
        to={title.link}
        onClick={() => toggleSidebar(title.label)}
        className={`${subOpen === title.label ? "subdrop" : ""} ${
          isActive ? "active" : ""
        }`}
      >
        {title.icon}
        <span>{title.label}</span>
        {title.submenu && <span className="menu-arrow" />}
      </Link>

      {subOpen === title.label && (
        <ul>
          {title.submenuItems?.map((item: any, idx: number) => (
            <SubMenuLevel2
              key={idx}
              item={item}
              subsidebar={subsidebar}
              toggleSubsidebar={toggleSubsidebar}
              location={location}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// =========================
// Main Sidebar
// =========================
const Sidebar = () => {
  const location = useLocation();

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");

  const toggleSidebar = (title: string) =>
    setSubopen((prev) => (prev === title ? "" : title));

  const toggleSubsidebar = (title: string) =>
    setSubsidebar((prev) => (prev === title ? "" : title));

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {SidebarDataPat.map((group, i) => (
                  <li className="submenu-open" key={i}>
                    <h6 className="submenu-hdr">{group.label}</h6>

                    <ul>
                      {group.submenuItems.map((title: any, j: number) => (
                        <Fragment key={j}>
                          <SubMenuLevel1
                            title={title}
                            subOpen={subOpen}
                            toggleSidebar={toggleSidebar}
                            subsidebar={subsidebar}
                            toggleSubsidebar={toggleSubsidebar}
                            location={location}
                          />
                        </Fragment>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>

      <HorizontalSidebar />
      <CollapsedSidebar />
    </div>
  );
};

export default Sidebar;
