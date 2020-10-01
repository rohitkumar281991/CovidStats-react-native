import {ADD_ONE} from '../actions/actionTypes';

const initialState = {
    state_add:[],
}

export const coronaDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ONE:
            return {
                state_add:action.data
            }
        default:
            return state
    }
}

// export default coronaDataReducer;