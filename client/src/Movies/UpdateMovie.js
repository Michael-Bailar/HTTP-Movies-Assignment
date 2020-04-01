import React, {useState, useEffect} from "react"
import { useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ['1', '2']
  }

const UpdateMovie = props => {

    const {id} = useParams()
    const {push}= useHistory()

    const [movie, setMovie] = useState(initialMovie)

    const handleChange = e => {
        e.persist()
        let value = e.target.value

        setMovie({
            ...movie,
            [e.target.name]: value
        })
        console.log(movie)
    }

    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id )
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [props.movieList, id])

    const handleSubmit = e => {
        e.preventDefault()
        console.log('submit test', movie, props)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res, props)
                setMovie(res.data)
                push(`/`)

            })
            .catch(err => console.log(err))
    }

    return(
        <div className='update-movie-container'>
            <h2>Update the movie</h2>
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
                    name="metascore"
                    placeholder={movie.stars}
                />
                <button>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie