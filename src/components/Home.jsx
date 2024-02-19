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
                backgroundImage: `url(https://png.pngtree.com/background/20230425/original/pngtree-parking-lot-full-of-blue-picture-image_2478450.jpg)`,
                height:"585px",
            }}
        >
            <div className="text-center position-relative z-index-1">
                <button
                    className="btn btn-warning"
                    style={{ marginTop: "60px",width:"100px", height:"50px" }}
                    onClick={handleSlot}
                >
                    Get slot
                </button>
                <br />
                <br />
                <button
                    className="btn btn-warning"
                    style={{ marginTop: "50px", width:"100px", height:"50px" }}
                    onClick={handleFreeSlot}
                >
                    Free slot
                </button>
            </div>
        </div>
    );
}
