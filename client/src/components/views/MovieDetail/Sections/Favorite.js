import React, {useEffect, useState} from 'react'
import Axios from 'axios' 
import { Button } from 'antd';

function Favorite(props) {
    const userFrom = props.userFrom
    const movieId = props.movieId 
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables ={
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

   

    
    //Page가 열리지마자 Favoirte관련된 데이터를 Mongo DB에서 받아오게끔
    useEffect(() => { 
        console.log('variables:',variables)
        //해당 위치의 DB에 검색에 필요한 값을 보내준다.
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response =>{
            setFavoriteNumber(response.data.favoriteNumber)  
            if(response.data.success){
               console.log(response.data)
            }else{
                alert('failed to get number information.')
            }
        })

          
         Axios.post('/api/favorite/favorited', variables)
         .then(response =>{ 
             if(response.data.success){
                setFavorited(response.data.favorited) 
             }else{
                 alert('Failed to get information')
             }
         })   
 
        
        
    }, [])


 


    const onClickFavorite = () => {

        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response =>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)    
                }else{
                    alert('Favorited 리스트에서 지우는걸 실패했습니다.')
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response =>{
                if(response.data.success){
                    console.log('movieTitle', movieTitle)
                   // console.log(response.data)
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited)    
                }else{
                    alert('Favorited 리스트에서 추가하는걸 실패했습니다.')
                }
            })

        }

    }

    return (
        <div> 
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "}  {FavoriteNumber}  </Button>
        </div>
    )
}

export default Favorite
