import React from 'react';

const AddUser = props => {

    //Add Users functional component
    return (
        <form>
            <label htmlFor="username">Username</label>
            <input id="username" type="text"/>
        </form>
    );
};

export default AddUser;