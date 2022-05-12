import {  StopOutlined } from '@ant-design/icons';

function listTooShort(props){

    return(
        <div className="warning-container">
            <div className="warning-text">
                {props.warning}
            </div>
            <StopOutlined className="stop-icon"/>
        </div>
    );
}

export default listTooShort;

