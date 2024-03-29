import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import Layout from "../components/Layout";
import { withRouter } from "../utils/Navigation";
import FavCard from "../components/FavCard";
import { useDispatch } from "react-redux/es/exports";
import { reduxAction } from "../utils/redux/actions/action";

const Favorite = (props) => {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  //remove from favorite

  const handleRemove = (item) => {
    const temp = localStorage.getItem("favorite");
    const tempData = JSON.parse(temp);
    const tempFilter = tempData.filter((data) => data.id !== item.id);
    localStorage.setItem("favorite", JSON.stringify(tempFilter));
    alert("Removed from favorite");
    dispatch(reduxAction("SET_FAVORITES", tempFilter));
    //window.location.reload();
  };

  return (
    <Layout>
      <div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        {favorites.map((item) => (
          <FavCard
            key={item.id}
            img={item.poster_path}
            title={item.title}
            onClickItem={() => navigate(`detail/${item.id}`)}
            onClickRemove={() => handleRemove(item)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default withRouter(Favorite);
