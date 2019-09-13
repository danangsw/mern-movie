import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Styled from "styled-components"

const Collapse = Styled.div.attrs({
    className: 'collapse navbar-collapse'
})``

const List = Styled.div.attrs({
    className: 'navbar-nav mr-auto'
})``

const Item = Styled.div.attrs({
    className: 'collapse navbar-collapse'
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    A Simple MERN Movie Application 
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/movie/list" className="nav-link">
                                Movies 
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movie/create" className="nav-link">
                                Create Movie 
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
