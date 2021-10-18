import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import {Row} from 'antd';



//rfce
function MovieDetail(props) {
 
    //movieId로 가져올 수 있는건 App.js에서 Route안의 /:movieId로 정의해줬기 때문이다.
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    //페이지가 처음 열릴때, DOM에서 가장 처음 가져오는거
    useEffect(() => {
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
        .then(response => response.json())
        .then(response => { 
            setMovie(response)
        })

        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => { 
            setCasts(response.cast)
        })
    }, [])

    const toggleActerView = () =>{
        setActorToggle(!ActorToggle)
    }

 
    return (
        <div>
            {/* Header */}
            <MainImage 
             image={`${IMAGE_BASE_URL}w1280/${Movie.backdrop_path}`}
             title={Movie.original_title}
             text={Movie.overview}
             />
            {/* body */}
            <div style={{width:'85%', margin:'1rem auto'}}> 
                {/* Favorite Button */}
                <div style={{ display:'flex', justifyContent: 'flex-end' }}>  
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} /> 
                </div>
                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br/> 
                {/* Actors Grid */} 
                {ActorToggle &&
                <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast, index)=>( 
                        <React.Fragment key={index}> 
                            {/* cast.profile_path:이미지파일 존재할때만 GridCards보이기 */}
                            {cast.profile_path &&
                            <GridCards  
                                image={cast.profile_path?
                                `${IMAGE_BASE_URL}w500/${cast.profile_path}` : null}  
                                characterName={cast.name}
                            /> 
                            } 
                        </React.Fragment> 
                    ))} 
                </Row> 
                }
                
                
                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={toggleActerView}> Toggle Actor View</button>
                </div>

            </div>
        </div>
    )
}

 
export default MovieDetail
