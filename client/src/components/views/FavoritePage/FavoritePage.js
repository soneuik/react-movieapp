import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import Favorite from '../MovieDetail/Sections/Favorite'
import './favorite.css'
import {Row, Button} from 'antd';
function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {

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


    }, [])

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
                      {Favorites.map((favorite, index) => 
                        <tr key={index}>  
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} mins</td>
                            <td><Button>Remove</Button></td> 
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
