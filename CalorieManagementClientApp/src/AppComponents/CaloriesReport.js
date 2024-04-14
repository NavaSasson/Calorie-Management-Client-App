// Ofir Bittan 208660076
// Nava Naane 212229512

// Imports.
import React, {useState} from 'react';
import {Button, Form, Col, Row, Alert, Table} from 'react-bootstrap';
import {idb} from '../idb';


// This file is for selecting a month to show its report.
// Define the Calories Report component.
function CaloriesReport() {
    // State variables : button state, display calories consumptions, select month, and calories data.
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showCaloriesConsumption, setShowCaloriesConsumption] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');
    const [calories, setCalorieConsumption] = useState([]);
    const onHide = () => setShowCaloriesConsumption(false);


    // Event handler for selecting a month and a year.
    const onMonthYearChangeHandler = event => {
        const monthYear = event.target.value;
        setSelectedMonthYear(monthYear);
        setButtonDisabled(monthYear === '');
    };
    // Function to fetch the monthly expense report.
    const getMonthlyReport = async () => {
        const caloriesDb = await window.idb.openCaloriesDB('caloriesdb', 1);
        return await caloriesDb.getMonthlyReport(selectedMonthYear);
    };


    // Async function to fetch the calorie consumption report.
    const fetchReport = async () => {
        try {
            const calories = await getMonthlyReport();
            setCalorieConsumption(calories);
            setShowCaloriesConsumption(true);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    // Function that shows every day calories consumption = row in the table.
    const rowForTable = ({calories, description, category}, idx) => {
        return (
            <tr key={idx}>
                <td>{calories}</td>
                <td>{description}</td>
                <td>{category}</td>
            </tr>
        );
    };

    const getFormattedYearMonth = date => {
        return `${(date.getFullYear())}-${(date.getMonth() + 1) < 10 ? '0' : ''}${(date.getMonth() + 1)}`;
    };

    // Select a month to show the calories report.
    return (
        <>
            <h4>Please select a month</h4>
            <Form>
                <Row>
                    <Col>
                        <Form.Control type='month' max={getFormattedYearMonth(new Date())}
                                      value={selectedMonthYear}
                                      onChange={onMonthYearChangeHandler}
                        />
                    </Col>
                    <Col>
                        <Button variant='primary'
                                disabled={buttonDisabled}
                                onClick={fetchReport}>
                            Show report
                        </Button>
                    </Col>
                </Row>
            </Form>
            {
                !calories.length ?
                    <Alert className="form-part" show={showCaloriesConsumption} onHide={onHide} key='info'
                           variant='light'>No calories
                        consumptions in the selected month.</Alert> :
                    <Table className="form-part" show={showCaloriesConsumption} onHide={onHide} striped bordered hover>
                        <thead>
                        <tr>
                            <th>Calories</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                        </thead>
                        <tbody>{calories.map(rowForTable)}</tbody>
                    </Table>
            }
        </>
    );
}

// Export the CaloriesReport component.
export default CaloriesReport;
