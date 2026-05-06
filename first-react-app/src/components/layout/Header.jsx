// import React, { useState } from "react";
// import { Menu } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import LogoBanner from "../auth/LogoBanner";

// const navLinks = [
//   { label: "الرئيسية", path: "/parent/dashboard" },
//   { label: "أنا", path: "/parent/profile" },
//   { label: "أبنائي", path: "/parent/children" },
//   { label: "تواصل معنا", path: "/contact" },
// ];

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <header className="dashboard-header">
//       <nav className="dashboard-navbar">
//         <div className="dashboard-navbar-inner">
//           <button
//             type="button"
//             className="dashboard-menu-btn"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             <Menu size={24} />
//           </button>

//           <ul className="dashboard-nav-links">
//             {navLinks.map((link) => (
//               <li key={link.path}>
//                 <NavLink
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `dashboard-nav-link ${isActive ? "active" : ""}`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           <div className="dashboard-mobile-spacer"></div>
//         </div>
//       </nav>

//       <LogoBanner />
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoBanner from "../auth/LogoBanner";
import "../../styles/header.css";

const navLinks = [
  { label: "الرئيسية", path: "/parent/dashboard" },
  { label: "أنا", path: "/parent/profile" },
  { label: "أبنائي", path: "/parent/children" },
  { label: "تواصل معنا", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="dashboard-header">
      <nav className="dashboard-navbar">
        <div className="dashboard-navbar-inner">
          <div className="dashboard-mobile-spacer"></div>

          <ul className="dashboard-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `dashboard-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="dashboard-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <Menu size={24} />
          </button>
        </div>

        {mobileOpen && (
          <ul className="dashboard-mobile-menu">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `dashboard-mobile-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <LogoBanner />
    </header>
  );
};

export default Header;
