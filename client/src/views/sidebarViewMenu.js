import React, { useState } from 'react';

const SidebarViewMenu = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="sidebar-menu-item">
        <div className="sidebar-menu-title" onClick={() => setIsActive(!isActive)}>
            <div>{title}</div>
        </div>
        {isActive && <div className="sidebar-menu-content">{content}</div>}
    </div>
  );
};

export default SidebarViewMenu;