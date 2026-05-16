import React from 'react';
import Featured from '../Featured/Featured';
import Choose from '../choose/Choose';
import Works from '../works/Works';
import Banner from '../banner/Banner'
import LatestTutors from '../Latest-Tutors/LatestTutors';
import LatestTuition from '../Latest-Tuition/LatestTuition';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestTuition></LatestTuition>
            <LatestTutors></LatestTutors>
            <Works></Works>
            <Choose></Choose>
            <Featured></Featured>
        </div>
    );
};

export default Home;