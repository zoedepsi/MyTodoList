import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './index.css';

class TodoItem extends React.Component {
    static propTypes = {
        onCheckBoxChange: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    }
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
class TodoList extends React.Component {
    static propTypes = {
        onCheckBoxChange: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onCheckAll: PropTypes.func.isRequired,
        status: PropTypes.string || PropTypes.bool
    }
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

class TodoInput extends React.Component {
    static propTypes = {
        onEnter: PropTypes.func.isRequired
    }
    keyUp(e) {
        if (e.keyCode === 13 && this.props.onEnter) {
            this.props.onEnter(e.target.value, () => {
                //通过回调函数设置输入框为空，思考有没有更好的方式？
                this.textInput.value = ""
            })
        }
    }
    render() {
        return (
            <div>
                <input className='new-todo' placeholder='今天要做什么？' onKeyUp={this.keyUp.bind(this)} ref={(input) => { this.textInput = input }} />
            </div>
        )
    }
}
class TodoOption extends React.Component {
    static propTypes = {
        itemcounts: PropTypes.func.isRequired,
        onStatusChange: PropTypes.func.isRequired,
        onClearCompleted: PropTypes.func.isRequired,
    }
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
class TodoContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            items: JSON.parse(localStorage.getItem("itemList")),
            itemStatus: "all",
            unCompletedCount: 0
        }
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleEnterKey = this.handleEnterKey.bind(this)
    }
    handleStatusChange(status) {
        this.setState({
            itemStatus: status
        })
    }
    getUnCompleteCount() {
        let newList = [];
        let itemList = this._getStorage();
        itemList.forEach(item => {
            if (!item.completed) {
                newList.push(item);
            }
        })
        return newList.length
    }
    handleCheckBoxChange(index) {
        let itemList = this._getStorage()
        itemList[index].completed = !itemList[index].completed;
        this._setStorage(itemList)
    }
    handleEnterKey(value, callback) {
        let item = { content: value, completed: false };
        if (localStorage.getItem('itemList')) {
            let itemList = this._getStorage();
            itemList.push(item);
            this._setStorage(itemList);
        } else {
            let itemList = [];
            itemList.push(item);
            this._setStorage(itemList);
        }
        callback();
    }
    handleDelete(index) {
        let itemList = this._getStorage();
        let newList = [...itemList.slice(0, index), ...itemList.slice(index + 1)]
        this._setStorage(newList);
    }
    handleCheckAll() {
        let newList = [];
        let itemList = this._getStorage();
        itemList.forEach(item => {
            if (!item.completed) {
                newList.push(item);
                item.completed = true;
            }
        })
        if (!newList.length) {
            itemList.forEach(item => {
                item.completed = !item.completed;
            })
        }
        this._setStorage(itemList);
    }
    handleClearCompleted() {
        let itemList = this._getStorage();
        let newList = [];
        itemList.forEach((item, index) => {
            if (!item.completed) {
                newList.push(item)
            }
        })
        this._setStorage(newList);
    }
    _getStorage() {
        return JSON.parse(localStorage.getItem('itemList'))
    }
    _setStorage(list) {
        localStorage.setItem("itemList", JSON.stringify(list))
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
    }
    render() {
        return (
            <div>
                <TodoInput onEnter={this.handleEnterKey} />
                <TodoList items={this.state.items} status={this.state.itemStatus} onCheckAll={this.handleCheckAll.bind(this)} onCheckBoxChange={this.handleCheckBoxChange.bind(this)} onDelete={this.handleDelete.bind(this)} />
                <TodoOption onStatusChange={this.handleStatusChange} onClearCompleted={this.handleClearCompleted.bind(this)} itemcounts={this.getUnCompleteCount.bind(this)} />
            </div>
        )
    }
}

ReactDOM.render(
    <TodoContainer />, document.getElementById('root')
)