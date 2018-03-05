import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

export default class TodoItem extends React.Component {

    handleCheckBox() {
        this.props.onCheckBoxChange()
    }
    handledelete() {
        this.props.onDelete()
    }
    render() {
        if (this.props.visible) {
            return (
                <li>
                    <div className="view">
                        <input className='toggle' type="checkbox" checked={this.props.item.completed} onChange={this.handleCheckBox.bind(this)} />
                        <label>{this.props.item.content}</label>
                        <button className="destroy" onClick={this.handledelete.bind(this)}></button>
                    </div>
                    {/* <input className="edit" type="text" disabled value={this.props.item.content}/> */}
                </li>
            )
        }
        return null;
    }
}