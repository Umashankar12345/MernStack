import React from 'react';
function Sidebar({setPage}) {
  return (
   <aside className="sidebar">
      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>
        <li onClick={() => setPage("form")}>Form</li>
        <li onClick={() => setPage('About')}>About</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
