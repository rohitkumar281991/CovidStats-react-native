import {ADD_ONE} from './actionTypes'
let nextId = 0

export const add_one = (id) => (
    {
        type:ADD_ONE,
        data:id,
        id:nextId++,
    }
);
