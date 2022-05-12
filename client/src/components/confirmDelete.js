// import {  CheckCircleFilled } from '@ant-design/icons';

function ConfirmDelete(props){

    return(
        <div className="confirm-container">
            <div className="confirmation-text">
                Are you sure that you want to delete your trip?
            </div>
            <button onClick={props.cancel}> No </button>
            <button> Yes </button>
            {/* <CheckCircleFilled className="confirmation-icon"/> */}
        </div>
    );
}

export default ConfirmDelete;

