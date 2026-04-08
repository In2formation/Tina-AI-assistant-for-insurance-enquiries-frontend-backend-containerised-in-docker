import React from "react";

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">

      {/* The header gives users instant orientation — who they're chatting with
          and that the system is active. Placing this at the top follows common
          chat app patterns, so the interface feels familiar and easy to trust. */}



      {/* Left side establishes identity and presence so the user instantly
         knows who they're talking to and that the system is active. */}
      <div className="header-left">
        <h1 className="header-title">Chat with Tina</h1>

        {/* Status indicator reinforces that Tina is “available” and responsive. */}
        <span className="header-status">
          <span className="status-dot"></span>
          Online
        </span>
      </div>

      {/* Right side groups utility controls in a familiar layout, keeping the
         header visually balanced and leaving room for future features. */}
      <div className="header-right">

        {/* Placeholder action button — included now to avoid layout shifts later
           when more header actions (like calling support) are added. */}
        <button className="header-btn" title="Phone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

            {/* This path draws the phone handset.
               - M = move to coordinate
               - v = vertical line
               - a = arc (rounded corners)
               - Numbers are coordinates in a 24x24 grid (0,0 top-left 24,24 bottom-right).
               - These values come from icon libraries like Heroicons. */}
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
                     19.79 19.79 0 0 1-8.63-3.07 
                     19.5 19.5 0 0 1-6-6 
                     19.79 19.79 0 0 1-3.07-8.67
                     A2 2 0 0 1 4.11 2h3
                     a2 2 0 0 1 2 1.72
                     12.84 12.84 0 0 0 .7 2.81
                     a2 2 0 0 1-.45 2.11L8.09 9.91
                     a16 16 0 0 0 6 6l1.27-1.27
                     a2 2 0 0 1 2.11-.45
                     12.84 12.84 0 0 0 2.81.7
                     A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>

        {/* Theme toggle supports comfort and accessibility.
           The icon switches so the user instantly understands the action. */}
        <button
          className="header-btn theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

              {/* Sun icon:
                 - circle = sun core (cx,cy = center, r = radius)
                 - lines = rays (x1,y1 → x2,y2 define start/end points)
                 - All numbers are coordinates in the same 24x24 grid. */}
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1"  x2="12" y2="3"  />  {/* top ray */}
              <line x1="12" y1="21" x2="12" y2="23" />  {/* bottom ray */}
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />  {/* top-left ray */}
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /> {/* bottom-right ray */}
              <line x1="1" y1="12" x2="3" y2="12" />  {/* left ray */}
              <line x1="21" y1="12" x2="23" y2="12" /> {/* right ray */}
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /> {/* bottom-left ray */}
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /> {/* top-right ray */}
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

              {/* Moon icon:
                 - M = move to start point
                 - A = arc command (radiusX radiusY rotation largeArcFlag sweepFlag endX endY)
                 - This arc creates the crescent shape.
                 - Again, all numbers are coordinates in the 24x24 grid. */}
              <path d="M21 12.79
                       A9 9 0 1 1 11.21 3
                       7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Avatar placeholder makes the header feel complete and prepares
           the layout for future user profile features. */}
        <div className="user-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

            {/* This path draws shoulders + torso.
               The circle draws the head.
               Coordinates again follow the 24x24 grid. */}
            <path d="M20 21v-2a4 4 0 0 0-4-4H8
                     a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;

