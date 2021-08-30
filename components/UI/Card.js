import React from 'react';

const Card = (props) => {
    //receives html or other components as children
    return <section className="bg-white shadow-2xl rounded-lg p-3 h-60">{props.children}</section>
};

export default Card;