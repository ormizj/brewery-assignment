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
        if (_.isEmpty(props.values.checked))
            return alert("You need to select a Brewery to update")
        if (props.values.checked.length > 1)
            return alert("You can only update one Brewery at a time")
        history.push('/brew-table/update')
    }

    const handleDeleteBrew = () => {
        const values = valuesToJson()
        let mainObj = props.mainObj

        //ensuring the user selected at least 1 value
        if (_.isEmpty(values))
            return setTimeout(() => { alert("You need to select at least one Brewery to delete") }, 0)

        //deleting brewery from "mainObj" (and states if empty)
        for (let value of values) {
            mainObj = objDelete(mainObj, value)
        }

        //placing "alert" in a timeout, so the user can see the change, while the alert is showing 
        setTimeout(() => { alert("Breweries deleted successfully") }, 0)
        props.setMainObj(mainObj)
        props.handleReset()
    }

    const valuesToJson = () => {
        const jsonValues = []
        return props.values.checked.map((element, index) => jsonValues[index] = JSON.parse(element))
    }

    const resetSelection = () => {
        for (let ref of props.brewRef.current) {
            if (ref.current)
                ref.current.checked = false
        }
        props.handleReset()
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
                        resetSelection={resetSelection}

                    />
                </Route>
                <Route path={'/brew-table/update'} exact>
                    <UpdateBrew
                        mainObj={props.mainObj} setMainObj={props.setMainObj}
                        resetSelection={resetSelection} values={valuesToJson()}
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