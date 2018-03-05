import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './index.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import itemsReducer from './reducers/items'
import TodoContainer from './containers/TodoContainer.js'

const store=createStore(itemsReducer)
ReactDOM.render(
    <Provider store={store}>
        <TodoContainer />
    </Provider>, document.getElementById('root')
)