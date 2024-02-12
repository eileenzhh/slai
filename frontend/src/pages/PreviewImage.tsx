import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../app-context/stage-context';

const PreviewImage = () => {
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.SUBMIT_IMAGE)
    }, [])
    return (
        <div>
            <Breadcrumb/>
            <h1>This is the Preview image page</h1>
            <Link to='/results'>Next</Link>

        </div>
    )
}

export default PreviewImage