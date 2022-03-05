import { Field, Form, Formik } from 'formik'
import { formatObjBrew, objInsertBrew, isBrewExist } from '../../../objects/mainObj'
import { closeDiv } from '../../../utils/windowUtil'
import history from '../../history'
import './../window.css'
import './create-brew.css'

/**
 * window-type component, used to create a new brewery.
 * 
 * @param {JSON} props 
 */
function CreateBrew(props) {

    /**
     * Complexity- Time: O(1); Space: O(1);
     * 
     * creates a new brewery and inserts it into "mainObj".
     * 
     * @param {JSON} values of the new brewery.
     */
    const handleSubmit = (values) => {
        const mainObj = props.mainObj

        //formatting values
        formatObjBrew(values)

        //return alert if brewery already exists
        if (isBrewExist(mainObj, values))
            return alert(`A Brewery with the name "${values.brewery}" already exists, try a different name`)

        //inserting brewery
        objInsertBrew(mainObj, values)

        //setting "mainObj" and redirecting user back to the brew table
        setTimeout(() => { alert("Brewery created successfully") }, (0))
        history.push('/brew-table')
        props.setMainObj(mainObj)
        props.resetForm()
    }

    return (
        <>
            <div className='window-background'></div>
            <div className='window-box'>
                <div className='close-div'>
                    <button className="btn-close" aria-label="Close" onClick={closeDiv} title='Close'></button>
                </div>
                <h5 title='Create A New Brewery'>Create A New Brewery</h5>
                <div className='CreateBrew'>
                    <Formik
                        initialValues={{
                            state: '',
                            city: '',
                            street: '',
                            brewery: ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <div className="input-group">
                                    <div className="input-group-text" id='CreateBrew-state-div' title='State'>State</div>
                                    <Field
                                        title={values.state}
                                        name='state'
                                        className='form-control'
                                        placeholder='State'
                                    />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-text" id='CreateBrew-city-div' title='City'>City</div>
                                    <Field
                                        title={values.city}
                                        name='city'
                                        className='form-control'
                                        placeholder='City'
                                    />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-text" id='CreateBrew-street-div' title='Street'>Street</div>
                                    <Field
                                        title={values.street}
                                        name='street'
                                        className='form-control'
                                        placeholder='Street'
                                    />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-text" title='Brewery' >Brewery</div>
                                    <Field
                                        title={values.brewery}
                                        name='brewery'
                                        className='form-control'
                                        placeholder='Brewery'
                                        required={true}
                                    />
                                </div>
                                <div className='window-submit'>
                                    <button type='submit' className='btn btn-info' title='Create Brewery'>
                                        Create Brewery
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik >
                </div>
            </div>
        </>
    )

}

export default CreateBrew