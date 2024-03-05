import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/SLAI-logo.png';

const Header = () => {

    return (
        <HeaderContainer>
           <LeftSide>
                <Logo src={logo} alt="Orange Circle" />
                <HeaderButton> <Link to='/'>Records</Link></HeaderButton>
           </LeftSide>
           <h3>User 1</h3>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    height: 4rem;
    display: flex;    
    align-items: center;
    padding: 0.5rem 2rem;
    justify-content: space-between;
`

const LeftSide = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
`

const Logo = styled.img`
    height: 4rem;
`

const HeaderButton = styled.h3`
    a {
        text-decoration: none;
        color: black;
    }
`