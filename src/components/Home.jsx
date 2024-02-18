import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleSlot = () => {
        navigate('/parking-list');
    };

    const handleFreeSlot = () => {
        navigate('/free-slot');
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: `url(https://static.tnn.in/thumb/msid-98974681,thumbsize-78984,width-1280,height-720,resizemode-75/98974681.jpg)`,
                height:"527px", 
                
                
                opacity:"90%"
            }}
        >
            <div className="text-center position-relative z-index-1">
                <button
                    className="btn btn-warning"
                    style={{ marginTop: "60px" }}
                    onClick={handleSlot}
                >
                    Get slot
                </button>
                <br />
                <br />
                <button
                    className="btn btn-warning"
                    style={{ marginTop: "50px" }}
                    onClick={handleFreeSlot}
                >
                    Free slot
                </button>
            </div>
        </div>
    );
}
