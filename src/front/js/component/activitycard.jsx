import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/activitycard.css";
import { Context} from "../store/appContext";


const ActivityCard = (props)=>{
    const { store, actions } = useContext(Context);
    const navigate= useNavigate();

    return(
        <div className="card-body" id="activityBody">
            <div className="image-container">
                <img src={props.img} className="card-img-top" alt="..."/>
                <div className="image-overlay d-flex justify-content-end align-items-start p-2" id="heartIconActivity">
                    <i className="fas fa-heart text-danger" onClick={() => {
                        actions.addFavourite(props.activity.title);
                        actions.addUserFavourites(store.userId)
                        }}></i>
                </div>
            </div>
            <div className="card-body mx-3">
                <div className="d-flex flex-column">
                    <div className=" col-11">
                        <div className="d-flex flex-row">
                            <img src={props.profile} className="profile-image" id="profileActivityCard"alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <p className="card-text"><small className="text-muted username">{store.addUsername}</small></p>
                                <hr className="mb-0"></hr>
                                <p className="card-text"><small className="text-muted publishing-date">{props.activity.publishing_date}</small></p>
                            </div>                        
                        </div>
                        <div className="d-flex flex-column align-items-center ">
                            <h3 className="card-title text-center mt-2">{props.activity.title}</h3>
                            <div className="mt-2">                                
                                <div className="card-description" id="description">
                                    <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i><i>{props.activity.description}</i></p>                            
                                </div>
                                <p className="card-text mt-2" id="priceTag"><i>{props.activity.price}</i></p>
                            </div>                   
                            <div className="btn-container-activity">
                                <button className="btn" type="button" onClick={()=> navigate("/activity/" + props.activity.id)}> <strong>View more</strong></button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard