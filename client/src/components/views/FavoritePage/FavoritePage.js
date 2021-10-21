import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import Favorite from '../MovieDetail/Sections/Favorite'
import './favorite.css'
import {Row, Button, Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => { 
        fetchFavoriteMovie() 
    }, [])

    const fetchFavoriteMovie = () => {
        //BackEnd에 userId를 보내줘서 DB에서 내용을 가져온다.
        Axios.post('api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')} )
        .then(response=>{
            if(response.data.success){
            
                    setFavorites(response.data.favorites)
                    console.log(response.data.favorites)
            }else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
            
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId, 
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                //DB에서 지우는데 성공하면, 화면에서 없애줘야하니. 
                //1. state값을 업데이트하거나 2. Axios를 다시 refresh하거나
                //2.
                fetchFavoriteMovie()
            }else{
                alert("리스트에서 지우는데 실패했습니다.")
            }
        })
    }
 

    const renderCards = Favorites.map((favorite, index) => { 
        const content = (
            <div>
                {favorite.moviePost ? 
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"} 
            </div>
        )

        return(
            <tr key={index}>  
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover> 
                <td>{favorite.movieRunTime} mins</td>
                <td><Button onClick={ () => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td> 
            </tr>
        )
    
    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorie Movies</h2> 
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                      {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
