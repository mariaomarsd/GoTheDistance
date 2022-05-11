
function SiteInfo(props){

    function continueOnSite() {
        props.click(false)
    }

    return(
        <div className="first-signin-view">
            <div className="site-title">
                Go The Distance!
            </div>
            <div className="first-signin-text">
                The perfrect website to keep track of all your travels.
            </div>
            <div className="first-signin-text">
                Here you can create new trips and add the locations you have travelled to.
            </div>
            <div className="first-signin-text">
                You can keep track of all your trips and modify them as you like.
            </div>
            <div className="first-signin-text">
                You can also see various statistics about your travels.
            </div>
            <button onClick={continueOnSite}>
                Continue on site
            </button>
        </div>
    );
}

export default SiteInfo;

