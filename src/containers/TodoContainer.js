import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import TodoOption from '../components/TodoOption'
import { initItems, deleteItem, toggleItem } from '../reducers/items';
import { connect } from 'react-redux';

class TodoContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [{content:'你好',completed:true},{content:'我好',completed:false},{content:'大家好',completed:true}],
            itemStatus: "all",
            unCompletedCount: 0
        }
    }
    handleStatusChange(status) {
        this.setState({
            itemStatus: status
        })
    }
    getUnCompleteCount() {
        let newList = [];
        this.state.items.forEach(item => {
            if (!item.completed) {
                newList.push(item);
            }
        })
        return newList.length
    }
    handleCheckBoxChange(index) {
        let itemList = this.state.items;
        itemList[index].completed = !itemList[index].completed;
        this.setState({
            items:itemList
        })
    }
    handleEnterKey(value) {
        let item = { content: value, completed: false };
            let itemList = this.state.items;
            itemList.push(item);
            this.setState({
                items:itemList
            })
    }

    handleCheckAll() {
        let newList = [];
        let itemList = this.state.items;
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
        this.setState({
            items:itemList
        })
    }
    handleClearCompleted() {
        let itemList = this.state.items;
        let newList = [];
        itemList.forEach((item, index) => {
            if (!item.completed) {
                newList.push(item)
            }
        })
        this.setState({
            items:newList
        })
    }
    render() {
        return (
            <div>
                <TodoInput onEnter={this.handleEnterKey.bind(this)} />
                <TodoList items={this.state.items} status={this.state.itemStatus} onCheckAll={this.handleCheckAll.bind(this)} onCheckBoxChange={this.handleCheckBoxChange.bind(this)} />
                <TodoOption onStatusChange={this.handleStatusChange.bind(this)} onClearCompleted={this.handleClearCompleted.bind(this)} itemcounts={this.getUnCompleteCount.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        items:state.items
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initItems:(items)=>{
            dispatch(initItems(items))
        },
        onDeleteItem:(itemIndex)=>{
            dispatch(deleteItem(itemIndex))
        },
        onToggleItem:(itemIndex)=>{
            dispatch(toggleItem(itemIndex))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoContainer)