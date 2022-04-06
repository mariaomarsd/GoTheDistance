import React from 'react';
// import { Checkbox } from 'antd';
import '../styles/myTripView.css';

function MyTripsView() {

    const myTrips = [
    {
        name: "New York",
        isChecked: false
    },
    {
        name: "London",
        isChecked: false
    },
    {
        name: "Texas",
        isChecked: false
    },
    {
        name:"Chicago",
        isChecked: false
    }]

  return ( 
     <div className="my-trips-view">
        {myTrips.map((items) => 
            <div className="my-trips-view-box" key={items.name}>
                <div className="my-trip-checkbox">
                    {/* <Checkbox></Checkbox> */}
                    <input type="checkbox"></input>
                </div>
                <div className="my-trip-name">
                    {items.name}
                </div>
            </div>
        )}
    </div>
  );
}

// return (
//     <div>
//         <div className="main-div">
//             {insurances.map((item) => (
//                 <div
//                     key={item.id}
//                     className={item.isChecked ? 'choice-border-dark' : 'choice-border-light'}
//                 >
//                     <Paragraph
//                         className={item.isChecked ? 'text-choice-dark' : 'text-choice-light'}
//                         onClick={() => { onCheck(item.id); }}
//                     >
//                         {item.title}
//                         <Checkbox
//                             className="check-box"
//                             checked={item.isChecked}
//                         />
//                     </Paragraph>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

export default MyTripsView;