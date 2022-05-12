// import {  CheckCircleFilled } from '@ant-design/icons';

function ConfirmDelete(props){

    return(
        <div className="delete-container">
            <div className="delete-text">
                Are you sure that you want to delete your trip?
            </div>
            <div className="delete-container-buttons">
                <button className="new-trip-button" id = "cancel" onClick={props.cancel}> No </button>
                <button className="new-trip-button" id = "confirm" onClick={props.confirm}> Yes </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;

