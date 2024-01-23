import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h1>This is the Main page.</h1>
            <Link to='/preview-image'>Next</Link>
        </div>
    )
}

export default Main