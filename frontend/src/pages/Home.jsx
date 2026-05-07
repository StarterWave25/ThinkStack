import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../services/authAPI";
import { useEffect } from "react";

function Home() {

  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isFetching,
  } = useGetMeQuery();

  const isLoggedIn = !!data;

  useEffect(() => {
    if (!isLoading && !isFetching && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoading, isFetching, navigate]);

  return (
    <div>Home</div>
  )
}

export default Home