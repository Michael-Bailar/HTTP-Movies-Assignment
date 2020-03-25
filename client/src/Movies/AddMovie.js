import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'



const AddMovie = props => {

    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
    })

    const {push} = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post('http://localhost:5000/api/movies', movie)
            .then(res => {
                push('/')
            })
            .catch(err => console.log(err))
        
    }

    const handleChange = e => {
        e.preventDefault()
        let value = e.target.value
        if (e.target.name === 'stars') {
            value = [value]
        }

        setMovie({
            ...movie,
            id: props.movieList.length + 1,
            [e.target.name]: value
        })
    }

    return(
        <div>
            <h2>Add a movie!</h2>
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder='title'
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder='director'
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder='metascore'
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder='star, otherstar'
                    onChange={handleChange}
                    value={movie.stars}
                />
                <button>Add This Movie</button>
            </form>
        </div>
    )
}

export default AddMovie