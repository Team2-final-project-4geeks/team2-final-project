const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedIn: false,
			favourite: [],
			storeTypes: {},						
			userId: null,
			userName: "",
			email:"",
			activities: [],
			query:"",
			selectedType:"",
			products: [],
		},
		actions: {
			addFavourite: (favId, favTitle) => {
				const store = getStore();
				if (!store.favourite.includes(favId) && store.favourite !== null) {
					setStore({ favourite: [...store.favourite, {id: favId, title: favTitle}] });
					console.log("adicionado")
				} else {
					alert("Favourite already exists!!");
				}
			},
			
			addActivities: (activity) => {
                const store = getStore();
                if (!store.activities.includes(activity)) {
                    setStore({...store, activities: activity});
                } else {
                    alert("Activity already exists!!");
                }
            },
			addProducts: (product) => {
                const store = getStore();
                if (!store.product.includes(product)) {
                    setStore({...store, products: product});
                } else {
                    alert("Product already exists!!");
                }
            },
			addQuery: (city) => {
                const store = getStore();
				setStore({...store, query: city})                
            },
			deleteFavourite: (favToDelete) => {
				const store = getStore();
				setStore({favourite: store.favourite.filter((fav) => fav !== favToDelete)})
			},			
			addType: (type) => {
				const store = getStore();
				setStore({storeTypes: type})			
			},			
			addUserFavourites: (id) => {

				const store = getStore()
				const actions=getActions()
				const token = localStorage.getItem('jwt-token');
				if(token) {
				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						"Authorization" : "Bearer " + token
					},
					body : JSON.stringify({ favourites: store.favourite })
				})
				.then(resp => {								
					return resp.json();
				})
				.then(data => {            
					console.log(data);
					actions.getUser(id);
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			}else{
				alert("error")
			}
			},
			getUser: (id) => {
				const token = localStorage.getItem('jwt-token');
				if(token) {
				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'GET',
					  headers: {
						"Content-Type": "application/json",
						"Authorization" : "Bearer " + token
					},
				})
				 .then(resp => {								
					return resp.json();
				})
				.then(data=> {
					const store = getStore();
					console.log(data.favourites)
					const jsonFavourites = data.favourites.map(item => {
						const validString = item.replace(/'/g, '"')
						return JSON.parse(validString)
					})
					console.log(jsonFavourites)		
					setStore({ ...store, favourite: jsonFavourites });
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			}
			},
			addId: (id) =>{
				const store = getStore();
				setStore({...store,userId:id})
			},
			addUsername: (username) =>{
				const store = getStore();
				setStore({...store,userName:username})
			},
			clearUser: () => {
                const store = getStore();
                setStore({
                    ...store,
                    userId: null,
                    userName: "",
                    email: "",
                    favourite: [] 
                });
			},
			setLoggedIn: (value) => {
                const store = getStore();
                setStore({ ...store, loggedIn: value });
              },
			addToCounter : (id) =>{
				fetch(process.env.BACKEND_URL + 'api/review/' + id , {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(resp => {
					return resp.json();
				})
				.then(data=> {
				})
				.catch(error => {
					console.log('Oops something went wrong'+ error);
				})
			},
			setSelectedType: (filterType) => {
                const store = getStore();
                setStore({ ...store, selectedType: filterType })
			},
		},
		
	};
};

export default getState;
