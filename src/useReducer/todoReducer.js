
export  const todoReducer = (state = [], action) =>{

    switch (action.type) {
        case 'add':
            return [...state, action.payload];
    
        case 'delete':
            return state.filter(todo=>todo.id !== action.payload); //aqui enviamos el id como payload
        
        case 'toggle':
            return state.map(todo=>
                (todo.id === action.payload)
                ?{...todo, done: !todo.done}
                :todo
                );

        case 'update':
            return state.map(todo=>
                (todo.id === action.payload.id)
                ?{...todo, desc: action.payload.desc}
                :todo
                );
        //FORMA LARGA
        // case 'toggle':
        //     return state.map(todo=>{

        //         if(todo.id === action.payload){
        //             return{
        //                 ...todo,
        //                 done: !todo.done
        //             }
        //         }else{
        //             return todo;
        //         }
        //     }) 

            default:
            return state;
    }

}