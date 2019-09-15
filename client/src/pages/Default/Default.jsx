import React, { Component } from 'react'

import Styled from 'styled-components'

const Wrapper = Styled.div`
    padding: 0 40x 40x 40x;
    margin: 0 30px;
`

const Title = Styled.h1.attrs({
    className: 'h1',
})``

const Label = Styled.label`
    margin: 5px;
`

class Default extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Wrapper>
                <Title>Are you getting lost?</Title>
                <Label><code>404</code> : No match routing for <code>{window.location.pathname}</code></Label>
            </Wrapper>
        )
    }
}

export default Default