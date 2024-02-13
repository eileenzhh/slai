import styled from 'styled-components'


export const Layout = styled.div`
    margin: 4rem 0;
`

export const Title = styled.h1`
    text-align: center
`

export const OrangeButton = styled.div<{ disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background-color: ${({disabled}) => (disabled ? '#FFD9BD' :  '#FFB37B')};
    border-radius: 1rem;
    position: absolute;
    bottom: 4rem;
    right: 4rem;
    width: 200px;
    height: 75px;
    a {
        text-decoration: none;
    }
    text-align: center;
    cursor: pointer;
`
export const MiddleContainer = styled.div`
    border: 1px solid #000;
    width: 444px;
    height: 420px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`