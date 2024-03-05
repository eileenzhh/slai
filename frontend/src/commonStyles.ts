import styled from 'styled-components'


export const Layout = styled.div`
    margin: 0 0 4rem;
    text-align: center;
`

export const Title = styled.h1`
    text-align: center
`

export const OrangeButton = styled.div<{ disabled?: boolean }>`
    width: 200px;
    height: 75px;
    a {
        text-decoration: none;
    }
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background-color: ${({disabled}) => (disabled ? '#FFD9BD' :  '#FFB37B')};
    border-radius: 1rem;
    // filter: drop-shadow(0 0 0.75rem grey);
    // box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
`

export const SmallOrangeButton = styled(OrangeButton)`
    width: 100px;
    height: 42px;
    font-size: 18px;
    border-radius: 0.5rem;
`

export const RightOrangeButton = styled(OrangeButton)`
    position: absolute;
    bottom: 4rem;
    right: 4rem;
`

export const BottomButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2rem;
`;

export const MiddleContainer = styled.div`
    width: 444px;
    height: 420px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`