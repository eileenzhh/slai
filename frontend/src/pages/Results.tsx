import React, {useEffect} from 'react';
import { Link} from 'react-router-dom';

import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../constants';
import { Layout, OrangeButton, Title } from '../commonStyles';

const Results = () => {

    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.RESULTS)
    }, [])
    return (
        <div>
            <Breadcrumb/>
            <Layout>
            <Title>This is the results page</Title>
            </Layout>
            <Link to='/results'><OrangeButton>Next</OrangeButton></Link>

        </div>
    )
}

export default Results