import { useState, useEffect } from "react";
import "./TodoForm.css";
// import TodoItem from "./TodoItem";

//To get data from localstorage

const TodoForm = () => {
    // let id = ''
    const getLocalItmes = () => {
        let list = localStorage.getItem('lists');
        // console.log(list);

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        } else {
            return [];
        }
    }
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalItmes());
    const [toggleItems, setToggleItems] = useState(true)
    let [id,setId]=useState('')
    let [deleteValue,setDeleteValue]=useState(true)
    const addItem = (e) => {
        // items=getLocalItmes()
        if (!inputData) {
            // setItems([...items, inputData])
            // setInputData('')
            alert("Add something")
        }
        else if (inputData && !toggleItems) {
            // console.log(100);
            console.log(items);
            setItems(items.map((ele)=>{
                if(ele===items[id]){
                    ele=inputData;
                    return ele;
                }
                return ele;
            }))
            console.log(items);
            setToggleItems(true);
            setInputData('');


        }
        else {
            setItems([...items, inputData])
            setInputData('')

        }


    }
    // const updateData = (e) => {
    //     e.preventdefault()
    //     if (inputData) {
    //         items[id] = inputData;
    //     }
    //     setInputData('')

    // }
    const cancelData = (e) => {
        e.preventDefault()
        setInputData('')
        setToggleItems(true)

    }
    const deleteItem = (index) => {
        // console.log(index);
        if(deleteValue){
            const updateditems = items.filter((elem, id) => {
                return index !== id;
            });
            setItems(updateditems);

        }
        else{
            alert("You are unable to delete Because you are in edit state")
        }

        // console.log(13)


        
    }
    const editItem = (index) => {
        // id = index;
        setInputData(items[index])
        setToggleItems(false)
        setId(index)
        setDeleteValue(false)

    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);
    return (
        <div>
            <section className="todo_input">
                <form>
                    <input type="text" placeholder="add your task" className="todo_input--field" id="name" value={inputData} onChange={(e) => setInputData(e.target.value)}></input>
                    {
                        toggleItems ? <button className="todo_input--button" type="button" id="addData" onClick={addItem} >Add</button> : <div className="editButtonItem">

                            <button className="todo_input--button" id="editData" onClick={addItem}>Update</button>
                            <button className="todo_input--button" id="cancelData" onClick={cancelData}>Cancel</button>
                        </div>

                    }


                </form>
                {/* <div id="msg"></div> */}
            </section>
            <div className="showItems">
                {

                    items.map((ele, index) => {
                        return (
                            <div className="eachItem" key={index}>
                                <li>
                                    <span>{ele}</span>

                                    <div>
                                        <button className="delete-todo js-delete-todo" onClick={() => deleteItem(index)}>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item"></i>

                                        </button>
                                        <button className="edit-todo" onClick={() => editItem(index)}>
                                            <i className="far fa-edit add-btn" title="Edit Item"></i>                                        </button>
                                    </div>
                                </li>

                            </div>

                        )
                    })


                }

                {/* <h1>Deba</h1> */}
            </div>


        </div>
    )
}
export default TodoForm;