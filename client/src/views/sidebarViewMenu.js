import React, { useState } from 'react';

const SidebarViewMenu = ({ title, content, id }) => {
  const [isActive, setIsActive] = useState(false);

  // const [isActive1, setIsActive1] = useState(false);
  // const [isActive2, setIsActive2] = useState(false);
  // const [isActive3, setIsActive3] = useState(false);
  // const [isActive4, setIsActive4] = useState(false);


  // function test(id) {
  //   console.log(id, isActive1)
  //   if(isActive1===true && id!==1) {
  //     setIsActive1(!isActive1);
  //     setActive(id)
  //   }
  //   else if(isActive2===true && id!==2) {
  //     setIsActive2(!isActive2);
  //     setActive(id)
  //   }
  //   else if(isActive3===true && id!==3) {
  //     setIsActive3(!isActive3);
  //     setActive(id)
  //   }
  //   else if(isActive4===true && id!==4) {
  //     setIsActive4(!isActive4);
  //     setActive(id)
  //   }
  //   else {
  //     console.log("ELSE")
  //     setActive(id)
  //   }
  // }


  // function setActive (id) {
  //   console.log("Líka id", id)
  //   if (id == 1) {
  //     console.log("IF 1 fyrri", isActive1)
  //     setIsActive1(!isActive1);
  //     console.log("IF 1 eftir", isActive1)
  //     if (isActive1){ 
  //       console.log("fer aldrei hingað")
  //       {<div className="sidebar-menu-content">{content}</div>}
  //     }
  //   } 
  //   if (id == 2){
  //     setIsActive1(!isActive2);
  //     isActive2 && <div className="sidebar-menu-content">{content}</div>
  //   }
  //   if (id == 3){
  //     setIsActive1(!isActive3);
  //     isActive3 && <div className="sidebar-menu-content">{content}</div>
  //   }
  //   if (id == 4) {
  //     setIsActive1(!isActive4);
  //     isActive1 && <div className="sidebar-menu-content">{content}</div>
  //   } 

  // }

  return (
    <div className="sidebar-menu-item" id={id}>
        <div className="sidebar-menu-title" onClick={() => setIsActive(!isActive)}>
            <div>{title}</div>
        </div>
        {isActive && <div className="sidebar-menu-content">{content}</div>}
    </div>
  );
};

export default SidebarViewMenu;


