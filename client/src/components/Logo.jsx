import React, { Component } from 'react'
import Styled from 'styled-components'
import logoImage from '../logo.svg'

const Wrapper = Styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="http://ubuntu.vbox:8080">
                <img src={logoImage} width="50" height="50" alt="http://ubuntu.vbox:8080" />
            </Wrapper>
        )
    }
}

export default Logo
