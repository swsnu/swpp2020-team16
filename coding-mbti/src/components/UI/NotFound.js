import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1>404 - Not Found!</h1>
        <h1>
            <Link to="/">
                Home
            </Link>
        </h1>
    </div>
);

export default NotFound;
