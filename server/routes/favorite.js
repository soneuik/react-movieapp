const express = require('express');
const router = express.Router();
//Model에서 Favorite가져오기
const { Favorite } = require ('../models/Favorite');
 
//  Axios.post('/api/favorite/favoriteNumber', variables)에서
// Post를 쓰니까 여기서도 post를 써야한다. 
router.post('/favoriteNumber', (req, res) =>{
    
      //mongoDB에서 favoirte 좋아요숫자 가져오기.
    req.body.movieId  
    Favorite.find({"movieId": req.body.movieId}) //front에서 보내는 movieId를 가진 정보를 DB에서 찾아달라.
    .exec((err, info) =>{
        if(err) return res.status(400).send(err) 
        //  그 다음에 프론트에 다시 숫자 정보를 보내주기. 
        res.status(200).json({success: true, favoriteNumber: info.length}) //ex)[1,2,3] >> info.length = 3인거고 3명이 이 영화를 좋아한다는 의미.
    })

    

})


module.exports = router;
