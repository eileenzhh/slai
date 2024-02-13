import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../constants';
import { Layout, MiddleContainer, OrangeButton, Title } from '../commonStyles';
import Loading from '../components/Loading';
import sample from '../assets/sample.png';

const PreviewImage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.SUBMIT_IMAGE)
    }, [])

    const onSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/results')
        }, 3000)
    }

    return (
        <div>
            {loading && <Loading />}
            <Breadcrumb/>
            <Layout>
                <Title>Submit Image</Title>
                <MiddleContainer>
                    <img src={sample} alt="preview image"/>
                </MiddleContainer>
                <p>Preview image</p>
            </Layout>

            <OrangeButton onClick={onSubmit} disabled={loading}>Next</OrangeButton>

        </div>
    )
}

export default PreviewImage
