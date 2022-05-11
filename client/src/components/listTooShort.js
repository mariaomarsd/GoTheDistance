import {  StopOutlined } from '@ant-design/icons';

function listTooShort(props){

    return(
        <div className="confirm-container">
            <div className="confirmation-text">
                Trip needs to have at least two stops! 
            </div>
            <StopOutlined className="stop-icon"/>
        </div>
    );
}

export default listTooShort;

