import { useNavigate } from "react-router-dom";



export default function BackNav() {
    const navigate = useNavigate();
    return (
<button
  onClick={() => navigate(-1)}
  className="bg-white fixed top-4 left-5 md:hidden opacity-40 px-4 py-2 rounded hover:bg-gray-600 z-[9999]"
>
  ←
</button>

    )
}