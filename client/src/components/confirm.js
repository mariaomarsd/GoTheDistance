import {  CheckCircleFilled } from '@ant-design/icons';

function ConfirmComponent(props){

    return(
        <div className="confirm-container">
            <div className="confirmation-text">
                {props.text}
            </div>
            <CheckCircleFilled className="confirmation-icon"/>
        </div>
    );
}

export default ConfirmComponent;

