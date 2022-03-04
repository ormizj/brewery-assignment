import history from "../components/history"

export const closeDiv = () => {
    if (window.confirm('Are you sure you want to close this window?'))
        history.goBack()
}

//TODO documentation for this file