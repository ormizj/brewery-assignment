import "./brew-table.css";
import { useState, useEffect } from 'react'
import { getBreweries } from '../../api/brewery.js'
import getMainObj, { objInsertBrew } from "../../objects/mainObj";
import { Form, Formik } from 'formik'
import BrewTableButton from "./BrewTableButton/BrewTableButton";
import { objToArr, sortArrObj } from "../../objects/arrObj";
import { Field } from "formik";
import _ from "lodash";

//TODO documentation for this file

function BrewTable() {

    //creating "mainObj" state
    const [mainObj, setMainObj] = useState()

    useEffect(() => {
        getBreweries().then(response => {
            if (!response.data) throw response;

            //instantiating "mainObj"
            const tempObj = getMainObj()
            for (let { state, city, street, id: brewery } of response.data) {
                objInsertBrew(tempObj, { state, city, street, brewery })
            }
            setMainObj(tempObj)

        }).catch(error => {
            console.error(error)
            alert("There was a problem with the request")
        })
    }, [])

    const renderTable = () => {
        //stopping function, if "mainObj" contains no breweries
        if (_.isEmpty(mainObj) || _.isEmpty(mainObj.states)) return
        const arrObj = objToArr(mainObj)
        sortArrObj(arrObj)
        let tableIndex = 0

        //rendering table
        return (arrObj.map((element) => {
            return (element[1].breweries.map((brewE) => {
                return (
                    <tr key={brewE[2]}>
                        <th className="BrewTable-checkbox">
                            <Field type="checkbox" name="checked" value={`{"state": "${element[0]}","brewery": "${brewE[1]}"}`} id={brewE[1]} />
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
                {({ values, resetForm }) => (
                    <>
                        <BrewTableButton
                            values={values} resetForm={resetForm}
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
                                    {renderTable()}
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