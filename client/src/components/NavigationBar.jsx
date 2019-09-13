import React, { Component } from 'react'
import Styled from "styled-components"

import Links from './Links'
import Logo from './Logo'

const Container = Styled.div.attrs({
    className: 'container'
})``

const Nav = Styled.div.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark'
})`
    margin-bottom: 20px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        ) 
    }
}

export default NavBar
