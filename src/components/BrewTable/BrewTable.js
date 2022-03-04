import "./brew-table.css";
import { useState, useEffect, useRef, createRef } from 'react'
import { getBreweries } from '../../api/brewery.js'
import mainObjTemplate, { objInsert } from "../../objects/mainObj";
import { Form, Formik } from 'formik'
import BrewTableButton from "./BrewTableButton/BrewTableButton";
import { objToArr } from "../../objects/arrObj";

//TODO documentation for this file

function BrewTable() {

    //creating "mainObj" state
    const [mainObj, setMainObj] = useState(mainObjTemplate())
    //ref array, to reset checkbox selection
    const brewRef = useRef([])

    useEffect(() => {
        getBreweries().then(response => {
            if (!response.data) throw response;
            //setting a temporary "mainObj"
            const tempObj = mainObjTemplate()

            //instantiating "mainObj"
            for (let data of response.data) {
                data['brewery'] = data.id
                objInsert(tempObj, data)
            }
            delete tempObj.states['']
            setMainObj(tempObj)

        }).catch(error => {
            console.error(error)
            alert("There was a problem with the request")
        })
    }, [])

    const renderTable = (handleChange) => {
        //stopping the function, if the "mainObj" has yet to be initialized
        if (mainObj.states['']) return

        //function to initialize ref array, and creating the table required variables
        const initRefArray = (index) => { brewRef.current[index] = createRef() }
        const arrObj = objToArr(mainObj)
        let tableIndex = 0

        //rendering the table
        return (arrObj.map((element) => {
            return (element[1].breweries.map((brewE) => {
                return (
                    <tr key={brewE[2]}>
                        {initRefArray(tableIndex)}
                        <th className="BrewTable-checkbox">
                            <input ref={brewRef.current[tableIndex]} type="checkbox" name="checked" value={`{"state": "${element[0]}","brewery": "${brewE[1]}"}`} id={brewE[1]} onChange={handleChange} />
                        </th>
                        <td>
                            <label htmlFor={brewE[1]} title={`#${tableIndex}`}>{++tableIndex}</label>
                        </td>
                        <td>
                            <label htmlFor={brewE[1]} title={`STATE: ${element[0]}`}>{element[0]}</label>
                        </td>
                        <td>
                            <label htmlFor={brewE[1]} title={`CITY: ${brewE[0]}`}>{brewE[0]}</label>
                        </td>
                        <td>
                            <label htmlFor={brewE[1]} title={`STREET: ${brewE[2]}`}>{brewE[2]}</label>
                        </td>
                        <td>
                            <label htmlFor={brewE[1]} title={`BREWERY: ${brewE[1]}`}>{brewE[1]}</label>
                        </td>
                    </tr>
                )
            }))
        }))
    }

    return (
        <div className="BrewTable">
            <Formik initialValues={{ checked: [] }}>
                {({ values, handleChange, handleReset }) => (
                    <>
                        <BrewTableButton
                            values={values} handleReset={handleReset} brewRef={brewRef}
                            mainObj={mainObj} setMainObj={setMainObj}
                        />
                        <Form>
                            <table className="table table-striped table-hover" id="Brewtable-table">
                                <thead>
                                    <tr>
                                        <th scope="col" width='5%' ></th>
                                        <th scope="col" width='5%' title="#">#</th>
                                        <th scope="col" width='15%' title="State">State</th>
                                        <th scope="col" width='15%' title="City">City</th>
                                        <th scope="col" width='25%' title="Street">Street</th>
                                        <th scope="col" width='35%' title="Brewery">Brewery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTable(handleChange)}
                                </tbody>
                            </table>
                        </Form>
                    </>
                )}
            </Formik >
        </div>
    )
}

export default BrewTable;