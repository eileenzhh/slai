import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../app-context/stage-context';
import { Layout, OrangeButton, Title } from '../commonStyles';

const PreviewImage = () => {
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.SUBMIT_IMAGE)
    }, [])
    return (
        <div>
            <Breadcrumb/>
            <Layout>
                <Title>Submit Image</Title>
            <p>This is the Preview image page</p>
            </Layout>

            <Link to='/results'><OrangeButton>Next</OrangeButton></Link>

        </div>
    )
}

export default PreviewImage