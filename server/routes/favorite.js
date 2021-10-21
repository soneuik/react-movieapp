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

router.post('/favorited', (req, res) =>{

    //내가 이 영화를 Favorite 리스트에 넣었는지, 정보를 DB에서 가져오기. 
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom }) //front에서 보내는 movieId를 가진 정보를 DB에서 찾아달라.
    .exec((err, info) =>{
        if(err) return res.status(400).send(err) 


        let result = false; //아직 이 영화를 favorite리스트에 넣어주지않았다. 
        if(info.length!==0){
            result = true;
        }

        //  그 다음에 프론트에 다시 숫자 정보를 보내주기. 
        res.status(200).json({success: true, favorited: result}) //ex)[1,2,3] >> info.length = 3인거고 3명이 이 영화를 좋아한다는 의미.
    }) 
    })


    router.post('/addToFavorite', (req, res) =>{ 

        //console.log(req.body)
        //instance 생성
        const favorite =  new Favorite(req.body)

        //MongoDB에 저장후에, 리턴값 받기
        favorite.save((error, doc) =>{
            if(error) return res.status(400).send(err) 
            return res.status(200).json({success: true, doc})
        })
    })
    
    
    router.post('/removeFromFavorite', (req, res) =>{

        //DB에서 해당 값 이용해서 찾은후에 삭제하기.
            Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
                .exec((err, doc) =>{
                    if(err) return res.status(400).send(err)
                    res.status(200).json({success: true, doc})  //MongoDb에서 보내준 정보는 doc에 저장된다.
                })
    
        })

          
    router.post('/getFavoriteMovie', (req, res) =>{

         Favorite.find({'userFrom':req.body.userFrom})
         .exec((err, favorites)=>{
             if(err) return res.status(400).send(err)

             return res.status(200).json({success:true,favorites})
         })
    
        })


        router.post('/removeFromFavorite', (req, res) =>{

            //DB에서 해당 값 이용해서 찾은후에 삭제하기.
                Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
                    .exec((err, doc) =>{
                        if(err) return res.status(400).send(err)
                        res.status(200).json({success: true})  //MongoDb에서 보내준 정보는 doc에 저장된다.
                    })
        
            })





        
 


module.exports = router;
