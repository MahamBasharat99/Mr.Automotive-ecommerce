const initaiState = {
    allOrders: [],
    currentuser: {},
    allProducts: [],
    userCart: {},
}

const store = (state = initaiState, action) => {

    switch (action.type) {
        case "currentUser":
            return ({
                ...state,
                currentuser: action.payload
            })

        case "logOut":
            return ({
                ...state,
                currentuser: ''
            })
        case "get_All_Products":
            return ({
                ...state,
                allProducts: action.payload
            })
        case "get_All_Orders":

            return ({
                ...state,
                allOrders: action.payload
            })
        case "set_user_cart":
            return ({
                ...state,
                userCart: action.payload
            })
        default:
            return (state)
    }
}

export default store;