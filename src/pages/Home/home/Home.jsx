import React from 'react';
import Featured from '../Featured/Featured';
import Choose from '../choose/Choose';
import Works from '../works/Works';

const Home = () => {
    return (
        <div>
            <h2>This is home</h2>
            <Works></Works>
            <Choose></Choose>
            <Featured></Featured>
        </div>
    );
};

export default Home;