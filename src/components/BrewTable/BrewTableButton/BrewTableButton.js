import './brew-table-button.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import history from '../../history'
import CreateBrew from '../../window/CreateBrew/CreateBrew'
import UpdateBrew from '../../window/UpdateBrew/UpdateBrew'
import _ from 'lodash'
import { objDelete } from '../../../objects/mainObj'

//TODO documentation for this file

function BrewTableButton(props) {

    const handleUpdateBrew = () => {
        //ensuring user selected exactly 1 brewery
        if (_.isEmpty(props.values.checked))
            return alert("You need to select a Brewery to update")
        if (props.values.checked.length > 1)
            return alert("You can only update one Brewery at a time")
        history.push('/brew-table/update')
    }

    const handleDeleteBrew = () => {
        const values = valuesToJson()
        let mainObj = props.mainObj

        console.log()

        //ensuring user selected at least 1 brewery, and confirming user choice
        if (_.isEmpty(values))
            return alert("You need to select at least one Brewery to delete")
        if (!window.confirm('Are you sure you want to delete selected Breweries?')) return

        //deleting brewery from "mainObj" (and states if they are empty)
        for (let value of values)
            objDelete(mainObj, value)

        //placing "alert" in a timeout, so the user can see the change, while the alert is showing 
        setTimeout(() => { alert("Breweries deleted successfully") }, 0)
        props.setMainObj(mainObj)
        props.resetForm()
    }

    /**
     * Complexity: Time- O(n); Space- O(n); [n= user selected breweries]
     * 
     * @returns {Array} selected breweries as JSON inside an Array
     */
    const valuesToJson = () => {
        const jsonValues = []
        return props.values.checked.map((element, index) => jsonValues[index] = JSON.parse(element))
    }

    return (
        <>
            <div className="BrewTableButton">
                <div className='BrewTableButton-seperator'>
                    <button className="btn btn-info" type="button" title='Create Brewery' onClick={() => history.push('/brew-table/create')}>Create Brewery</button>
                </div>
                <div className='BrewTableButton-seperator'>
                    <button className="btn btn-info" type="button" title='Update Brewery' onClick={handleUpdateBrew}>Update Brewery</button>
                </div>
                <div className='BrewTableButton-seperator'>
                    <button className="btn btn-info" type="button" title='Delete Brewery' onClick={handleDeleteBrew}>Delete Brewery</button>
                </div>
            </div>
            <Switch>
                <Route path={'/brew-table/create'} exact>
                    <CreateBrew
                        mainObj={props.mainObj} setMainObj={props.setMainObj}
                        resetForm={props.resetForm}
                    />
                </Route>
                <Route path={'/brew-table/update'} exact>
                    <UpdateBrew
                        mainObj={props.mainObj} setMainObj={props.setMainObj}
                        resetForm={props.resetForm} values={valuesToJson()}
                    />
                </Route>
                <Route>
                    <Redirect to={'/brew-table'} />
                </Route>
            </Switch>
        </>
    )
}

export default BrewTableButton