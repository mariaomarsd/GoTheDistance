import {  StopOutlined } from '@ant-design/icons';

function WarningMessage(props){

    return(
        <div className="warning-container">
            <div className="warning-text">
                {props.warning}
            </div>
            <StopOutlined className="stop-icon"/>
        </div>
    );
}

export default WarningMessage;

