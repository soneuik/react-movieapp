 
import React, { useEffect, useState  } from 'react' 
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../commons/MainImage';
import MainMovieImage from'../commons/MainImage';
import {Row} from 'antd';

function LandingPage() {


    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0) 

    useEffect(() => {
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
       
   }, [])

   const fetchMovies = (endpoint) =>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response => { 
            setMovies([...Movies, ...response.results]) 
            setMainMovieImage(response.results[0])  
            setCurrentPage(response.page)  
        })
   }

   const loadMoreItems = () =>{ 
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${ CurrentPage + 1 }`; 
        fetchMovies(endpoint)
   }

    return (
        <div style={{width:'100%', margin:'0'}}>
            {/* {Main image} START*/}
             {/* MainMovieImage가 있으면은 실행해라 라는 의미 */}
            {MainMovieImage &&  
             <MainImage 
             image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
             title={MainMovieImage.original_title}
             text={MainMovieImage.overview}
             />
            }
            {/* {Main image} END*/}
           
            <div style={{width: '85%', margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/> 
                {/* {Movie Grdie Cards} START */}
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index)=>( 
                        <React.Fragment key={index}> 
                            <GridCards  
                                landingpage
                                image={movie.poster_path?
                                `${IMAGE_BASE_URL}w500/${movie.poster_path}` : null} 
                                movieId = {movie.id}
                                movieName={movie.original_title}
                            /> 
                        </React.Fragment> 
                    ))} 
                </Row> 
                {/* {Movie Grdie Cards} END */}
            </div>

            <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
