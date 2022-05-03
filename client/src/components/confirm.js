import {  CheckCircleFilled } from '@ant-design/icons';

function ConfirmComponent(props){

    return(
        <div className="confirm-container">
            <div className="confirmation-text">
                Trip saved!
            </div>
            <CheckCircleFilled className="confirmation-icon"/>
        </div>
    );
}

export default ConfirmComponent;

