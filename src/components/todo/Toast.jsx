import { AiFillWarning } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import "./Toast.css"
const Toast=(props)=>{
    return(
        <div >
            <div className="toast">
            <section className="toastItem">
                <div>
                    {/* <img src="" alt="WarningIcon" /> */}
                    <AiFillWarning/>
                </div>
                <div className="toastItemContent">
                    <h1>Warning</h1>
                    <p>U are unable to do this because u are in edit state</p>
                </div>
            </section>
            <div className="delete">
                {/* <img src="" alt="deleteIcon" /> */}
                <TiDelete onClick={props.close}/>
            </div>
            </div>

        </div>
    )
}
export default Toast;