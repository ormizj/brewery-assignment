import history from "../components/history"

/** 
* function to close a window-type component .
*/
export const closeDiv = () => {
    if (window.confirm('Are you sure you want to close this window?'))
        history.goBack()
}
