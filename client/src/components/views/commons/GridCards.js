import React from 'react'
import {Col} from 'antd';

 
//rfce >> react functional 
function GridCards(props) { 
    //LandingPage페이지 GrdierCards
    if(props.landingpage){
        return ( 
            <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height: '320px'}} src={props.image} alt={props.movieName} />
                </a>
            </div> 
            </Col>
        ) 
    //MovieDetail페이지 GrdierCards
    }else{
        return(
            <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}> 
                    <img style={{width:'100%', height: '320px'}} src={props.image} alt={props.characterName} /> 
            </div> 
            </Col>
        )
    }
    
}

export default GridCards
