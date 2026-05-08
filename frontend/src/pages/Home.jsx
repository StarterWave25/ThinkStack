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
    <section className="home-page">

      <div className="home-content">

        <h1 className="home-title">
          Welcome Home
        </h1>

        <p className="home-description">
          The app exists.
          The ambition exists.
          The features are still fighting for their lives.
        </p>

      </div>

    </section>
  )
}

export default Home