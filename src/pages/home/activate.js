import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import { useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import {useEffect} from "react";
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Activate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user',JSON.stringify({...user, verified: true}));
      dispatch({
        type:'VERIFY', payload: true,
      })

      setTimeout(() => {
        navigate("/");
      },3000)
      
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      },3000)
    }
  };
  useEffect(() => {
 
    activateAccount();
  }, []);
  

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
