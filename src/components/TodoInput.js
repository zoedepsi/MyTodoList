import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

export default class TodoInput extends React.Component {

    bindEnterKeyUp(e) {
        if (e.keyCode === 13 && this.props.onEnter) {
            this.props.onEnter(e.target.value)
            this.textInput.value = ""
        }
    }
    render() {
        return (
            <div>
                <input className='new-todo' placeholder='今天要做什么？' onKeyUp={this.bindEnterKeyUp.bind(this)} ref={(input) => { this.textInput = input }} />
            </div>
        )
    }
}