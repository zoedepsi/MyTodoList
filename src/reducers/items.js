const INIT_ITEMS = 'INIT_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const TOGGLE_ITEM = 'TOGGLE_ITEM'

export default function (state = {
    items: []
}, action) {
    switch (action.type) {
        case INIT_ITEMS:
            return {
                items: action.items
            }
        case ADD_ITEM:
            return {
                items: [...state.items, action.item]
            }
        case DELETE_ITEM:
            return {
                items: [
                    ...state.items.slice(0, action.itemIndex),
                    ...state.items.slice(action.itemIndex + 1)
                ]
            }
        case TOGGLE_ITEM:
            return {
                items: state.items.map((item,index) => {
                    if(index===action.itemIndex){
                        item.completed = !item.completed
                    }
                })
            }
        default:
            return state
    }
}

export const initItems = (items) => {
    return {
        type: INIT_ITEMS,
        items
    }
}
export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        item
    }
}
export const deleteItem = (itemIndex) => {
    return {
        type: DELETE_ITEM,
        itemIndex
    }
}
export const toggleItem=(itemIndex)=>{
    return{
        type:TOGGLE_ITEM,
        itemIndex
    }
}