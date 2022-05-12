function resolvePromise(promiseToResolve, promiseState, notifyACB){
    if (!promiseToResolve) {
        return
    }
	promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;
    if (notifyACB) {
        notifyACB();
    }
    function saveDataACB(result){ 
	    if(promiseState.promise !== promiseToResolve) {
            return
        }
        promiseState.data= result;
        if (notifyACB) {
            notifyACB();
        }
    } 
    function saveErrorACB(err)  { 
        if(promiseState.promise !== promiseToResolve) {
            return
        }
        promiseState.error= err;
        if (notifyACB) {
            notifyACB();
        }
    }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;