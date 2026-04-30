import React from 'react';
import Featured from '../Featured/Featured';
import Choose from '../choose/Choose';
import Works from '../works/Works';
import Banner from '../banner/Banner'
import TuitionPosts from '../Tuition Posts/TuitionPosts';
import LatestTutors from '../Latest-Tutors/LatestTutors';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TuitionPosts></TuitionPosts>
            <LatestTutors></LatestTutors>
            <Works></Works>
            <Choose></Choose>
            <Featured></Featured>
        </div>
    );
};

export default Home;