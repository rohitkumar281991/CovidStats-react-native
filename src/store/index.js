import { createStore } from 'redux'
import rootReducer from '../reducers'
import {coronaDataReducer} from '../reducers/coronaDataReducer'

// export default store = createStore(rootReducer)
export default store = createStore(coronaDataReducer)