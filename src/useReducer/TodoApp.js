import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";
import { todoReducer } from "./todoReducer";
import {useForm} from '..//hook/useForm'


//Lo que retorna init es lo que sera el initialstate
const init = () =>{
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const TodoApp = () => {

  //useReducer
  //con [] se indica que si no hay initialstate este sera un arreglo vacio
  const [todos, dispatch] = useReducer(todoReducer, [],init);

  //utilizando el customHook useForm para llenar formulario
  const [{description},handleInputChange,reset]=useForm({
    description:''
  });  
  
  //Effect que escucha cuando un TODO cambia.
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos]);

  //Eliminar***
  const handleDelete = (todoId)=>{
    
    //Crear la accion
    const action = {
      type: 'delete',
      payload: todoId
    };

    //Dispatch
    dispatch(action);
  }

  //Cambiar el Done***
  const handleToggle = ( todoId )=>{
    dispatch({
      type: 'toggle',
      payload: todoId
    });
  }


  //Editar***
  const initialState2={
    descriptionEdit:""
  }

  const [edit, setEdit] = useState(initialState2);
  const {descriptionEdit}=edit;

  //onchange para cambiar el valor del input
  const handleOnChange = (e)=>{
      setEdit({
        ...edit,
        [e.target.name]: e.target.value,
      });
    }

  //Accion a ejecutar cuando se precciona boton edit
  const handleEdit = (todoId)=>{

    //Validacion que input sea mayor a 1
    if(descriptionEdit.trim().length <=1){
      return;
    }

    console.log(todoId);
    console.log(descriptionEdit);

    //Estructura para nuevoTodo
    const newTodo = {
      id: todoId,
      desc: descriptionEdit,
    };
    //Action para nuevo todo
    const action = {
      type: "update",
      payload: newTodo,
    };

    //Dispatch encargado de mandar la action al todoReducer
    dispatch(action);

    //Reiniciamos el input al initialState2
    setEdit(initialState2);
  }

  //Agregar***
  const handleSubmit = (e) => {
    e.preventDefault(); 

    //Validacion del campo
    if(description.trim().length <=1){
      return;
    }
    //Estructura para nuevoTodo
    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false,
    };

    //Action para nuevo todo
    const action = {
      type: "add",
      payload: newTodo,
    };

    //Dispatch encargado de mandar la action al todoReducer
    dispatch(action);
    //Reseinicia el input agregar con el metodo reset del hook useForm
    reset();
  };

  

  return (
    <div>
      <h1>desde Todo ({todos.length})</h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <ul className="list-group list-group-flush ">
            {todos.map((todo, i) => (
              <li 
                key={todo.id} 
                className="list-group-item"
              >
                <p 
                //Si (todo.done) es true con el operador '&&' se agrega la clase complete
                  className={`${todo.done && 'complete'}`}
                  onClick={()=>handleToggle(todo.id)}
                >
                  {i + 1}. {todo.desc}

                </p>
                <button 
                className="btn btn-danger"
                onClick={()=>handleDelete(todo.id)}
                >Borrar</button>

                
                
                  <input
                    type="text"
                    name="descriptionEdit"
                    value={descriptionEdit}
                    onChange={handleOnChange}
                    placeholder={todo.desc}
                  />
                
                  <button 
                  
                  className="btn btn-primary"
                  onClick={()=>handleEdit(todo.id)}
                  >Editar</button>

              </li>
            ))}
          </ul>
        </div>
        <div className="col-5">
          <h4>Agregar TODO </h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              className="form-control "
              placeholder="aprender..."
              autoComplete="off"
              value={description}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-outline-primary mt-1 btn-block"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
