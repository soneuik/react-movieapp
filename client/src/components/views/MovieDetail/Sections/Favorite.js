import React, {useEffect, useState} from 'react'
import Axios from 'axios' 

function Favorite(props) {

    const movieId = props.movieId
    const userForm = props.userForm
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


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
                setFavoriteNumber(response.data.FavoriteNumber) 
            }else{
                alert('failed to get number information.')
            }
        })

          
         Axios.post('/api/favorite/favorited', variables)
         .then(response =>{
             if(response.data.success){
                setFavorited(response.data.favorited) 
             }else{
                 alert('정보를 가져오는데 실패했습니다.')
             }
         })   
        
        
    }, [])

    return (
        <div>
            <button>{Favorited? "Not Favorite": "Add to Favorite"} {FavoriteNumber}</button> 
        </div>
    )
}

export default Favorite
