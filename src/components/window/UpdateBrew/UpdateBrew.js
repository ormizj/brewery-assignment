import { Form } from 'formik'
import { Field } from 'formik'
import { Formik } from 'formik'
import _ from 'lodash'
import { findBrew, formatObjInput, objInsert, isBrewExist, objDelete } from '../../../objects/mainObj'
import { closeDiv } from '../../../utils/windowUtil'
import history from '../../history'
import './../window.css'
import './update-brew.css'

//TODO documentation for this file

function UpdateBrew(props) {

    let state, city, street, brewery

    //going back in-case of missing value (usually caused by refresh)
    if (_.isEmpty(props.values)) {
        history.push('/brew-table')
    } else {
        ({ state, city, street, brewery } = findBrew(props.mainObj, props.values[0]))
    }

    const handleSubmit = (values) => {
        const mainObj = props.mainObj

        //formatting values
        values = formatObjInput(values)

        //checking if brewery exists, if changed, and sends back an alert
        if (values.brewery !== brewery) {
            if (isBrewExist(mainObj, values))
                return alert(`A Brewery with the name "${values.brewery}" already exists, try a different name`)
        }

        //deleting old brewery
        objDelete(mainObj, { state, brewery })

        //inserting brewery
        objInsert(mainObj, values)

        //setting mainObj and redirecting user back to the brew table
        setTimeout(() => { alert("Brewery updated successfully") }, (0))
        history.push('/brew-table')
        props.setMainObj(mainObj)
        props.resetSelection()
    }

    const renderTable = () => {
        return (
            <>
                <Formik
                    initialValues={{ state, city, street, brewery }}
                    onSubmit={handleSubmit}
                >
                    {({ values, dirty }) => (
                        <Form>
                            <table>
                                <tbody>
                                    <tr>
                                        <th width="50%" title='From:'>From:</th>
                                        <th width="50%" title='To:'>To:</th>
                                    </tr>
                                    <tr>
                                        {/* ------------------------------From:------------------------------ */}
                                        <td className='UpdateBrew-from'>
                                            <div className="input-group">
                                                <input
                                                    value={state}
                                                    title={state}
                                                    className='form-control'
                                                    placeholder='State'
                                                    disabled={true}
                                                />
                                                <div className="input-group-text" id='UpdatedBrew-state-div' title='State'>State</div>
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    value={city}
                                                    title={city}
                                                    className='form-control'
                                                    placeholder='City'
                                                    disabled={true}
                                                />
                                                <div className="input-group-text" id='UpdatedBrew-city-div' title='City'>City</div>
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    value={street}
                                                    title={street}
                                                    className='form-control'
                                                    placeholder='Street'
                                                    disabled={true}
                                                />
                                                <div className="input-group-text" id='UpdatedBrew-street-div' title='Street'>Street</div>
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    value={brewery}
                                                    title={brewery}
                                                    className='form-control'
                                                    placeholder='Brewery'
                                                    disabled={true}
                                                />
                                                <div className="input-group-text" title='Brewery'>Brewery</div>
                                            </div>
                                        </td>
                                        {/* ------------------------------To:------------------------------ */}
                                        <td className='UpdateBrew-to'>
                                            <div className="input-group">
                                                <Field
                                                    title={values.state}
                                                    name='state'
                                                    className='form-control'
                                                    placeholder='State'
                                                />
                                            </div>
                                            <div className="input-group">
                                                <Field
                                                    title={values.city}
                                                    name='city'
                                                    className='form-control'
                                                    placeholder='City'
                                                />
                                            </div>
                                            <div className="input-group">
                                                <Field
                                                    title={values.street}
                                                    name='street'
                                                    className='form-control'
                                                    placeholder='Street'
                                                />
                                            </div>
                                            <div className="input-group">
                                                <Field
                                                    title={values.brewery}
                                                    name='brewery'
                                                    className='form-control'
                                                    placeholder='Brewery'
                                                    required={true}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='window-submit'>
                                <button type='submit' className='btn btn-info' title='Update Brewery' disabled={!dirty}>
                                    Update Brewery
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik >
            </>
        )
    }

    return (
        <>
            <div className='window-background'></div>
            <div className='window-box' id='window-box-big'>
                <div className='close-div'>
                    <button className="btn-close" aria-label="Close" onClick={closeDiv} title='Close'></button>
                </div>
                <h5 title='Update An Existing Brewery'>Update An Existing Brewery</h5>
                <div className='UpdateBrew'>
                </div>
                <div className='UpdateBrew'>
                    {renderTable()}
                </div>
            </div>
        </>
    )

}

export default UpdateBrew