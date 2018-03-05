import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

export default class TodoOption extends React.Component {

    handleStatusChange(status) {
        this.props.onStatusChange(status)
    }
    handleClearCompleted() {
        this.props.onClearCompleted()
    }
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">剩余{this.props.itemcounts()}条</span>
                <ul className="filters">
                    <li onClick={this.handleStatusChange.bind(this, "all")}><a>All</a></li>
                    <li onClick={this.handleStatusChange.bind(this, false)}><a>Active</a></li>
                    <li onClick={this.handleStatusChange.bind(this, true)}><a>Completed</a></li>
                </ul>
                <button className="clear-completed" onClick={this.handleClearCompleted.bind(this)} >Clear completed</button>
            </footer>
        )
    }
}