import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoItem extends React.Component {
    handleCheckBox() {
        if (this.props.onCheckBoxChange) {
            this.props.onCheckBoxChange()
        }
    }
    handledelete() {
        if (this.props.onDelete) {
            this.props.onDelete()
        }
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
    handleCheckBoxChange(index) {
        if (this.props.onCheckBoxChange) {
            this.props.onCheckBoxChange(index)
        }
    }
    handleDelete(index) {
        if (this.props.onDelete) {
            this.props.onDelete(index)
        }
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
                <ul className="todo-list">{rows}</ul>
            </section>

        )
    }
}

class TodoInput extends React.Component {
    keyUp(e) {
        if (e.keyCode === 13 && this.props.onEnter) {
            this.props.onEnter(e.target.value, () => {
                this.textInput.value = ""
            })
        }
    }
    checkAll() {
        if (this.props.onCheckAll) {
            this.props.onCheckAll();
        }
    }
    render() {
        return (
            <div>
                <input className='toggle-all' type='checkbox' onChange={this.checkAll.bind(this)} />
                <input className='new-todo' placeholder='今天要做什么？' onKeyUp={this.keyUp.bind(this)} ref={(input) => { this.textInput = input }} />
            </div>
        )
    }
}
class TodoOption extends React.Component {
    handleStatusChange(status) {
        if (this.props.onStatusChange) {
            this.props.onStatusChange(status)
        }
    }
    handleClearCompleted() {
        if (this.props.onClearCompleted) {
            this.props.onClearCompleted()
        }
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
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        itemList.forEach(item => {
            if (!item.completed) {
                newList.push(item);
            }
        })
        return newList.length
    }
    handleCheckBoxChange(index) {
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        itemList[index].completed = !itemList[index].completed;
        localStorage.setItem("itemList", JSON.stringify(itemList))
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
    }
    handleEnterKey(value, callback) {
        let item = { content: value, completed: false };
        if (localStorage.getItem('itemList')) {
            let itemList = JSON.parse(localStorage.getItem('itemList'));
            itemList.push(item);
            localStorage.setItem("itemList", JSON.stringify(itemList))
        } else {
            let itemList = [];
            itemList.push(item);
            localStorage.setItem("itemList", JSON.stringify(itemList))
        }
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
        callback();
    }
    handleDelete(index) {
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        let newList = [...itemList.slice(0, index), ...itemList.slice(index + 1)]
        localStorage.setItem("itemList", JSON.stringify(newList))
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
    }
    handleCheckAll() {
        let newList=[];
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        itemList.forEach(item => {
            if(!item.completed){
                newList.push(item);
                item.completed=true;
            }    
        })
        if(!newList.length){
            itemList.forEach(item => {
                    item.completed=!item.completed;  
            })
        }
        localStorage.setItem("itemList", JSON.stringify(itemList))
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
    }
    handleClearCompleted() {
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        itemList.forEach((item, index) => {
            if (item.completed) {
                itemList = [...itemList.slice(0, index), ...itemList.slice(index + 1)]
            }
        })
        localStorage.setItem("itemList", JSON.stringify(itemList))
        this.setState({
            items: JSON.parse(localStorage.getItem("itemList"))
        })
    }
    render() {
        return (
            <div>
                <TodoInput onEnter={this.handleEnterKey} onCheckAll={this.handleCheckAll.bind(this)} />
                <TodoList items={this.state.items} status={this.state.itemStatus} onCheckBoxChange={this.handleCheckBoxChange.bind(this)} onDelete={this.handleDelete.bind(this)} />
                <TodoOption onStatusChange={this.handleStatusChange} onClearCompleted={this.handleClearCompleted.bind(this)} itemcounts={this.getUnCompleteCount.bind(this)} />
            </div>
        )


    }
}

ReactDOM.render(
    <TodoContainer />, document.getElementById('root')
)