// Ofir Bittan 208660076
// Nava Naane 212229512

// Imports.
import {Button, Form, InputGroup} from 'react-bootstrap';
import React, {useState} from 'react';
import {idb} from '../idb'

// This file is for the calories form.
// Define the CaloriesForm component.
function CaloriesForm() {
    // Define an array of meal categories.
    const mealCategories = ['BREAKFAST', 'LUNCH', 'DINNER', 'OTHER'];

    // Define state variables for num of calories, category, and description.
    const [numOfCalories, setNumOfCalories] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // Event handlers to handle changes.
    const caloriesChangeHandler = event => setNumOfCalories(event.target.value);
    const categoryChangeHandler = event => setCategory(event.target.value);
    const descriptionChangeHandler = event => setDescription(event.target.value);

    // Function to reset form fields.
    const resetFields = () => {
        setNumOfCalories('');
        setCategory('');
        setDescription('');
    };

    // Function to handle adding a new calorie consumption.
    // Function to handle adding a new calorie consumption.
    const addCaloriesConsumptionHandler = async (event) => {
        event.preventDefault();
        try {
            // Open the IndexedDB and add the calorie data.
            const caloriesDB = await window.idb.openCaloriesDB('caloriesdb', 1);
            const caloriesData = {
                calories: numOfCalories,
                category: category,
                description: description,
                date: new Date()
            };
            await caloriesDB.addCalories(caloriesData);
            resetFields();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };


    // Calories form.
    return (<>
            <h2>Enter Calories Consumption</h2>
            <Form className='p-3 form-part' onSubmit={addCaloriesConsumptionHandler}>
                <Form.Label>Num of calories</Form.Label>
                <InputGroup className='mb-2'>
                    <Form.Control min={1} step={1} type='number' required
                                  value={numOfCalories}
                                  onChange={caloriesChangeHandler}
                    />
                </InputGroup>
                <Form.Label> Category </Form.Label>
                <Form.Select required
                             value={category}
                             onChange={categoryChangeHandler}
                >
                    <option disabled value=""></option>
                    {mealCategories.map(val => <option key={val}>{val}</option>)}
                </Form.Select>
                <Form.Group className='mb-2'>
                    <Form.Label> Description </Form.Label>
                    <Form.Control as='textarea' required
                                  value={description}
                                  onChange={descriptionChangeHandler}
                    />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button className='btn-lg form-part' type='submit'>Add</Button>
                </div>
            </Form>
        </>);
}

// Export the CaloriesForm component.
export default CaloriesForm;