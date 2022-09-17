import { useState, useEffect } from "react";
// import "./TodoForm.css";
// import { AiFillDelete } from 'react-icons/fa';
import { FiDelete } from "react-icons/fi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Toast from "./Toast";
// import Modal from "./Modal";

//To get data from localstorage

const TodoForm = () => {
    const getLocalItmes = () => {
        let list = localStorage.getItem('lists');

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        } else {
            return [];
        }
    }
    const handleKeydown = (e) => {
        if (e.key === " " && e.target.value.length === 0) {
            e.preventDefault();
        }
    };
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalItmes());
    const [toggleItems, setToggleItems] = useState(true)
    let [id, setId] = useState('')
    let [deleteValue, setDeleteValue] = useState(true)
    const [open, setOpen] = useState(false)
    // const handleClose = () => {
    //     setOpen(false);
    //   };

    //   const handleOpen = () => {
    //     setOpen(true);
    //   };
    const addItem = (e) => {
        if (!open) {
            if (!inputData || inputData === " ") {
                alert("Add something")
            }
            else if (inputData && !toggleItems) {
                console.log(items);
                setItems(items.map((ele) => {
                    if (ele === items[id]) {
                        ele = inputData;
                        return ele;
                    }
                    return ele;
                }))
                console.log(items);
                setToggleItems(true);
                setInputData('');
                setOpen(false)


            }
            else {
                setItems([...items, inputData])
                setInputData('')

            }


        }
        else {
            e.preventDefault()
        }
    }
    const cancelData = (e) => {
        if (!open) {
            e.preventDefault()
            setInputData('')
            setToggleItems(true)
        }
        else {
            e.preventDefault()
        }

    }
    const inputValue=(e)=>{
        if(!open){
            setInputData(e.target.value)
        }
        else{
            setInputData('')
        }

    }
    const deleteItem = (index) => {
        if (!open) {
            if (!inputData && toggleItems) {
                deleteValue = true

            }
            // console.log(index);
            if (deleteValue) {
                const updateditems = items.filter((elem, id) => {
                    return index !== id;
                });
                setItems(updateditems);

            }
            else {
                setOpen(true)
            }

            // console.log(13)



        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    const editItem = (index) => {
        // id = index;
        if (!open) {
            setInputData(items[index])
            setToggleItems(false)
            setId(index)
            setDeleteValue(false)
            setOpen(false)
        }

    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);
    return (
        <div className="Total_section" >
            <section className="todo_input max-w-5xl mx-auto mt-10 mb-0 inset-1/2 pl-1">{
                // open?<Modal open={handleClose}/>:null
            }
                <form className="flex justify-center items-center gap-4">
                    <input type="text" placeholder="add your task" className="todo_input--field border border-indigo-600 ... rounded-md px-2 py-2 rounded-md" value={inputData} onChange={inputValue} onKeyDown={handleKeydown}></input>
                    {
                        toggleItems ? <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-blue-700 text-white border-transparent" type="button" id="addData" onClick={addItem} >Add</button> : <div className="flex justify-center items-center ml-2 gap-1">

                            <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-red-600 text-white border-transparent" id="editData" onClick={addItem}>Update</button>
                            <button className="todo_input--button border-zinc-800 border-solid border-2 rounded-sm px-1 py-1 w-20 bg-blue-700 text-white border-transparent" id="cancelData" onClick={cancelData}>Cancel</button>
                        </div>

                    }


                </form>
                {/* <div id="msg"></div> */}
            </section>
            {/* <Modal open={open}></Modal> */}

            <div className="showItems flex justify-center items-start flex-col pl-12 mt-5 absolute max-w-5xl my-0 mx-auto gap-4 left-64 pl-11">
                {

                    items.map((ele, index) => {
                        return (
                            <div className="eachItem" key={index} >
                                <li className="rounded bg-indigo-700 p-4 flex justify-between items-start cursor-pointer list-none shadow-customShadow bg-blue-600 gap-4 text-white duration-100 min-w-customMinWdith mx-auto my-0">
                                    <span>{ele}</span>

                                    <div className="flex justify-center items-center gap-1">
                                        <button className="delete-todo js-delete-todo" onClick={() => deleteItem(index)}>
                                            <AiFillDelete className="add-btn hover:text-red-600" title="Delete Item" />

                                        </button>
                                        <button className="edit-todo" onClick={() => editItem(index)}>
                                            <AiFillEdit className="add-btn hover:text-red-600 " title="Edit Item" />
                                        </button>
                                    </div>
                                </li>

                            </div>

                        )
                    })


                }

                {/* <h1>Deba</h1> */}
            </div>
            {
                open ? <Toast close={handleClose} /> : null
            }





        </div>
    )
}
export default TodoForm;