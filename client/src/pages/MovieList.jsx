import React, { Component } from 'react'
import ReactTable from 'react-table'
import movieAPI from '../api'

import Styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = Styled.div`
    padding: 0 40x 40x 40x;
`
const Update = Styled.div`
    color: #0000ff;
    cursor: pointer;
`

const Delete = Styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMovie extends Component {
    updateMovie = event => {
        event.preventDefault()

        window.location.href = `/movie/update/${this.props.id}`
    }

    render() {
        return <Update onClick={ this.updateMovie }>Edit</Update>
    }
}

class DeleteMovie extends Component {
    deleteMovie = event => {
        event.preventDefault()

        if(
            window.confirm(`Do you want to delete the movie ${this.props.id} permanently?`)
        ) {
            movieAPI.deleteMovie(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={ this.deleteMovie }>Delete</Delete>
    }
}

class MovieList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await movieAPI.getAllMovies()
            .then(movies => {
                this.setState({
                    movies: movies.data.data,
                    isLoading: false,
                })
            })
            .catch( error => {
                this.setState({
                    movies: [],
                    isLoading: true,
                })
            })
    }

    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MovieList -> render -> movies', movies)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
                show: false
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Stars',
                accessor: 'stars',
                filterable: true,
                Cell: props => <span>{ props.value.join(', ')}</span>
            },
            {
                Header: 'Showtimes',
                accessor: 'showtimes',
                Cell: props => <span>{ props.value.join(' | ')}</span>
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showtable = true

        if (!movies.length) {
            showtable = false
        }

        return (
            <Wrapper>
                { showtable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MovieList