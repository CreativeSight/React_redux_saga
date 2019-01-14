//Init saga watch all stats
export const fetchAll = (id) => {
    return {
        type: 'FETCH_ALL',
        id
    }
};
//Pass feteched allData to reducers
export const fetchAllSuccess = (data, id) => {
    return {
        type: 'FETCH_ALL_SUCCESS',
        data,
        id
    }
};

//Fetch users
export const fetchUsersStats = (url, id) => {
    return {
        type: 'FETCH_USERS_STATS',
        url,
        id
    }
};
//Pass fetched data to reducers
export const fetchUserSuccess = (data, id) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        data,
        id
    }
};
//Delete user
export const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        id
    }
};
//Saga action start fetch
export const currentFetchData = () => {
    return {
        type: 'CURRENT_FETCH_DATA'
    }
};
//Saga action error info
export const fetchDataFail = () => {
    return {
        type: 'FETCH_DATA_FAILED'  
    }
};
//Clear data after select all
export const clearData = () => {
    return {
        type: 'CLEAR_DATA',
    }
};