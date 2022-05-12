
function SiteInfo(props){

    function continueOnSite() {
        props.click(false)
    }

    return(
        <div className="first-signin-view">
            <div className="site-title">
                Welcome to Go The Distance!
            </div>
            <div className="first-signin-text">
                The perfrect website to keep track of all your travels
                <span className="logo-icon">
                    <i className="fa-solid fa-thumbtack"></i>
                </span>
            </div>
            <div className="first-signin-text">
                Here you can create new trips and add the locations you have travelled to
                <span className="logo-icon">
                    <i className="fa-solid fa-location-dot"></i>
                </span>
            </div>
            <div className="first-signin-text">
                You can keep track of all your trips and modify them as you like
                <span className="logo-icon">
                    <i className="fa-solid fa-heart"></i>
                </span>
            </div>
            <div className="first-signin-text">
                You can also see various statistics about your travels
                <span className="logo-icon">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                </span>
            </div>
            <button className="continue-button" onClick={continueOnSite}>
                Continue on site
                <span className="logo-icon">
                    <i className="fa-solid fa-paper-plane"></i>
                </span>
            </button>
        </div>
    );
}

export default SiteInfo;

