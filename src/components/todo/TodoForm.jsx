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
        if(!inputData && toggleItems){
            deleteValue=true

        }
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
        <div className="Total_section" >
            
            <section className="todo_input max-w-5xl mx-auto mt-10 mb-0 inset-1/2">
                <form className="flex justify-center items-center gap-4">
                    <input type="text" placeholder="add your task" className="todo_input--field border border-indigo-600 ... rounded-md px-4 py-4 rounded-md" id="name" value={inputData} onChange={(e) => setInputData(e.target.value)}></input>
                    {
                        toggleItems ? <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-blue-700 text-white border-transparent" type="button" id="addData" onClick={addItem} >Add</button> : <div className="flex justify-center items-center ml-2 gap-1">

                            <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-red-600 text-white border-transparent" id="editData" onClick={addItem}>Update</button>
                            <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-blue-700 text-white border-transparent" id="cancelData" onClick={cancelData}>Cancel</button>
                        </div>

                    }


                </form>
                {/* <div id="msg"></div> */}
            </section>
            
            <div className="showItems flex justify-center items-start flex-col pl-12 mt-5 absolute max-w-5xl my-0 mx-auto gap-4 left-64 pl-11">
                {

                    items.map((ele, index) => {
                        return (
                            <div className="eachItem" key={index} >
                                <li className="rounded bg-indigo-700 p-4 flex justify-between items-start cursor-pointer list-none shadow-md ... bg-blue-600 gap-4 text-white">
                                    <span>{ele}</span>

                                    <div className="flex justify-center items-center gap-1">
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