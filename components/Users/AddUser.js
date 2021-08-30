import React from 'react';

import Card from '../UI/Card';

const AddUser = props => {
    //Add Users functional component

    const addUserHandler = (e) => {
        console.log("Preventing DeaFault");
        e.preventDefault();
    }

    return (
        <Card className="">
            <form className="input" onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" />
                <label htmlFor="age">Age (Years)</label>
                <input id="age" type="number" />

                <button type="submit">Add user</button>
            </form>
        </Card>
    );
};

export default AddUser;