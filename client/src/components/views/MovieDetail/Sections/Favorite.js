import React, {useEffect} from 'react'
import Axios from 'axios'
import { response } from 'express'
function Favorite(props) {

    const movieId = props.movieId
    const userForm = props.userForm
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    //Page가 열리지마자 Favoirte관련된 데이터를 Mongo DB에서 받아오게끔
    useEffect(() => {
        let variables ={
            userForm,
            movieId
        }

        //해당 위치의 DB에 검색에 필요한 값을 보내준다.
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response =>{
            if(response.data.success){

            }else{
                alert('failed to get number information.')
            }
        })
        
    }, [])

    return (
        <div>
            <button>Favorite</button> 
        </div>
    )
}

export default Favorite
