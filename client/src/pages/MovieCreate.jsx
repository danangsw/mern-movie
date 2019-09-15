import React, { Component } from 'react'
import movieAPI from '../api'

import Styled from 'styled-components'

const Title = Styled.h1.attrs({
    className: 'h1',
})``

const Wrapper =  Styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = Styled.label`
    margin: 5px;
`

const InputText = Styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const SubmitButton = Styled.button.attrs({
    className: 'btn btn-primary',
})`
    margin: 15px 15px 15px 5px; 
`

const CancelButton = Styled.a.attrs({
    className: 'btn btn-danger',
})`
    margin: 15px 15px 15px 5px; 
`

class MovieCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            synopsis: '',
            director: '',
            writers: '',
            stars: '',
            rating: '0',
            showtimes: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputSynopsis = async event => {
        const synopsis = event.target.value
        this.setState({ synopsis })
    }

    handleChangeInputDirector = async event => {
        const director = event.target.value
        this.setState({ director })
    }

    handleChangeInputWriters = async event => {
        const writers = event.target.value
        this.setState({ writers })
    }

    handleChangeInputStars = async event => {
        const stars = event.target.value
        this.setState({ stars })
    }

    handleChangeInputShowtimes = async event => {
        const showtimes = event.target.value
        this.setState({ showtimes })
    }

    handleSubmitMovie = async event => {
        const {
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        const writersToArr = writers.split(', ')
        const starsToArr = stars.split(', ')
        const showtimesToArr = showtimes.split(', ')

        const payload =  {
            title,
            synopsis,
            director,
            writers: writersToArr,
            stars: starsToArr,
            rating,
            showtimes: showtimesToArr,
        }

        await movieAPI.createMovie(payload)
            .then(data => {
                window.alert(`Movie created successfully!`)

                this.state = {
                    title: '',
                    synopsis: '',
                    director: '',
                    writers: '',
                    stars: '',
                    rating: '0',
                    showtimes: '',
                }
            })
            .catch(error => {
                console.error(error)
                window.alert(`Failed to create Movie!`)
            })
    }

    render() {
        const {
            title,
            synopsis,
            director,
            writers,
            stars,
            rating,
            showtimes,
        } = this.state

        return(
            <Wrapper>
                <Title>Create Movie</Title>
                
                <Label>Title: </Label>
                <InputText type="text" value={title} onChange={this.handleChangeInputTitle}
                    placeholder="(Required) i.e. Titanic"
                />

                <Label>Rating: </Label>
                <InputText type="number" value={rating} onChange={this.handleChangeInputRating}
                    placeholder="(Required) i.e. 7.7"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                />

                <Label>Synopsis: </Label>
                <InputText type="text" value={synopsis} onChange={this.handleChangeInputSynopsis}
                    placeholder="(Required) i.e. A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
                />

                <Label>Director: </Label>
                <InputText type="text" value={director} onChange={this.handleChangeInputDirector}
                    placeholder="(Required) i.e. James Cameron"
                />

                <Label>Writers: </Label>
                <InputText type="text" value={writers} onChange={this.handleChangeInputWriters}
                    placeholder="(Required) i.e. James Cameron, John Doe"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Stars: </Label>
                <InputText type="text" value={stars} onChange={this.handleChangeInputStars}
                    placeholder="(Required) i.e. Leonardo DiCaprio, Kate Winslet, Billy Zane"
                    pattern=",\s+(?=(?:(?:[^']*'){2})*[^']*$)"
                />

                <Label>Showtimes: </Label>
                <InputText type="text" value={showtimes} onChange={this.handleChangeInputShowtimes}
                    placeholder="(Required) i.e. 12:30, 13:30, 14:30"
                    pattern="^(([0-1]?[0-9]|2[0-3]):[0-5][0-9])(?:,\s*(([0-1]?[0-9]|2[0-3]):[0-5][0-9]*?))*$"
                />

                <SubmitButton onClick={this.handleSubmitMovie}>Add</SubmitButton>
                <CancelButton href={'/movie/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MovieCreate