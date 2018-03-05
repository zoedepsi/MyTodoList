import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

export default class TodoList extends React.Component {

    handleCheckBoxChange(index) {
        this.props.onCheckBoxChange(index)
    }
    handleDelete(index) {
        this.props.onDelete(index)
    }
    checkAll() {
        this.props.onCheckAll();
    }
    render() {
        var rows = [];
        if (!this.props.items) {
            return null;
        }
        this.props.items.forEach((item, index) => {
            rows.push(<TodoItem item={item} visible={this.props.status === "all" || this.props.status === item.completed} key={index} onCheckBoxChange={this.handleCheckBoxChange.bind(this, index)} onDelete={this.handleDelete.bind(this, index)} />);
        });
        return (
            <section className='main'>
                <input className='toggle-all' type='checkbox' onChange={this.checkAll.bind(this)} />
                <ul className="todo-list">{rows}</ul>
            </section>
        )
    }
}