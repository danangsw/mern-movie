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

const CancelButton = Styled.button.attrs({
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
        const showtimesToArr = showtimes.split(' | ')

        const payload =  {
            title,
            synopsis,
            director,
            writersToArr,
            starsToArr,
            rating,
            showtimesToArr,
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
                <InputText type="text" value={title} onChange={this.handleChangeInputTitle}/>

                <Label>Rating: </Label>
                <InputText type="number" value={rating} onChange={this.handleChangeInputRating}
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                />

                <Label>Synopsis: </Label>
                <InputText type="text" value={synopsis} onChange={this.handleChangeInputSynopsis}/>

                <Label>Director: </Label>
                <InputText type="text" value={director} onChange={this.handleChangeInputDirector}/>

                <Label>Writers: </Label>
                <InputText type="text" value={writers} onChange={this.handleChangeInputWriters}
                    pattern="(.+?)(?:,|$)"
                    />

                <Label>Stars: </Label>
                <InputText type="text" value={stars} onChange={this.handleChangeInputStars}
                    pattern="(.+?)(?:,|$)"
                />

                <Label>Showtimes: </Label>
                <InputText type="text" value={showtimes} onChange={this.handleChangeInputShowtimes}
                    pattern="(.+?)(?:\w\|\w|$)"
                />

                <SubmitButton onClick={this.handleSubmitMovie}>Add</SubmitButton>
                <CancelButton href={'/movie/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MovieCreate