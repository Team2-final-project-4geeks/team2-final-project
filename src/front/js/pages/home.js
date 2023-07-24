import ActivityCard from "../component/activitycard.jsx";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Product } from "../component/productcard.jsx";

import "../../styles/home.css";


export const Home = () => {

	const [activities, setActivities] = useState([]);
  const [products, setProducts] = useState([]);
  
	useEffect(() => {		
		getActivities();
    	getProduct();
	}, []);
	
	const getActivities = () => {
		fetch(process.env.BACKEND_URL + '/api/activities',{
			method: 'GET',
      	headers: {
				"Content-Type": "application/json"
			}
		})
     .then(resp => {
			console.log(resp);					
			return resp.json();
		})
		.then(data=> {
			console.log(data);
			setActivities(data);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}
	const getProduct = () =>{
		fetch('https://fakestoreapi.com/products', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp);					
			return resp.json();
		})
		.then(data=> {
			console.log(data);
			setProducts(data);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}

	const showActivity = () =>{
		return activities.map((activity, index) =>{
			return(
				<li key={index} className= "col">					
					<div className="card h-100">
						<img src="https://picsum.photos/id/1/200" className="card-img-top" alt="..."></img>
						<ActivityCard activity={activity}/>
					</div>						
				</li>
			)
		})
	}
	const showProducts = () => {
		if (products && products.length > 0){
		return products.map((product, index) => {
			return (
				<li key={index} className= "col">					
					<div className="card h-100">
						<img src="https://picsum.photos/id/1/200" className="card-img-top" alt="..."></img>
						<Product product={product}/>
					</div>						
				</li>
			)
		})
		} else {
			return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
			)
			}
	}
	return (
		<div className="container-fluid">
			<h1 className="py-5">Activities</h1>
				<div className="container-fluid">			
					<div className="row row-cols-1 row-cols-md-5 g-4">													
						{showActivity()}						
					</div>	
				</div>						
		</div>
	)	
	
	return (
		<div className="container-fluid">
				<h1 className="py-5">Products</h1>
					<div className="container-fluid" >
							<div className="row row-cols-1 row-cols-md-4 g-4 ">
								{products && showProducts()}
							</div>
					</div>
		</div>			
	);
}
