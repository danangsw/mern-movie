import React, { Component } from 'react'
import ReactTable from 'react-table'
import movieAPI from '../../api'

import Styled from 'styled-components'

import 'react-table/react-table.css'

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

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
            limit: 3
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const payload = { limit: this.state.limit }
        
        await movieAPI.topRatedMovies(payload)
            .then(movies => {
                this.setState({
                    movies: movies.data.data,
                    isLoading: false
                })
            })
            .catch(error => {
                this.setState({
                    movies: [],
                    isLoading: true,
                })
            })
    }

    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MovieTop -> render -> movies', movies)

        const columns = [
            {
                Header: 'No.',
                id: 'row',
                maxWidth: 50,
                Cell: (row) => {
                    return <div align="center">{row.index+1}.</div>;
                }
            },
            {
                Header: 'ID',
                accessor: '_id',
                show: false
            },
            {
                Header: 'Title',
                accessor: 'title'
            },
            {
                Header: 'Rating',
                accessor: 'rating'
            }
        ]

        let showtable = true

        if (!movies.length) {
            showtable = false
        }

        return(
            <Wrapper>
                <Title>Top Rated Movies</Title>
                <Label>Top {this.state.limit} as rated by the editor</Label>
                { showtable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        showPagination={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default Home