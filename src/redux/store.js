import { createStore } from 'redux';

const initialState = {
    status: "",
    history: [],
    step: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_HEADER":
            return { ...state, status: action.payload }
        case "SET_HISTORY":
            return { ...state, history: action.payload }
        case "SET_STEP":
            return { ...state, step: action.payload }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;