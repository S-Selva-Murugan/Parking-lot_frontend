import { useNavigate } from "react-router-dom"
export default function Home (){
    const navigate = useNavigate()

    const handleSlot = ()=>{
        navigate('/parking-list')
    }

    const handleFreeSlot = () =>{
        navigate('/free-slot')
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="text-center">
                <h1>Home page</h1>
                <button
                 className="btn btn-warning"
                 style={{marginTop:"50px"}}
                 onClick={handleSlot}> Get slot</button>
                 <br/>
                 <br/>
                 <button
                 className="btn btn-warning"
                 style={{marginTop:"50px"}}
                 onClick={handleFreeSlot}> Free slot</button>
            </div>
        </div>
    )
}
