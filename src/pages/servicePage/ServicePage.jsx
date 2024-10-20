import { useEffect, useState } from "react";
import "./servicePage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import Header from "../../components/header/Header";

const ServicePage = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const selectedCategories = location.state;
  useEffect(() => {
    try {
      const fetchServices = async () => {
        const filter = { category: selectedCategories };
        const filterQuery = JSON.stringify(filter);
        const encodedFilter = encodeURIComponent(filterQuery);
        console.log(`${baseURL}/service?filter=${encodedFilter}`);
        let data = await axios.get(
          `${baseURL}/service?filter=${encodedFilter}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setServices(data?.data?.results?.data);
      };

      fetchServices();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        services.map(async (item) => {
          const imgUrl = await getImage(item?.image);
          return { id: item?.id, imgUrl };
        })
      );

      const urlMap = {};
      urls.forEach((u) => {
        urlMap[u.id] = u.imgUrl;
      });
      // console.log(urlMap)
      setImageUrls(urlMap);
    };

    if (services.length > 0) {
      fetchImageUrls(); // Fetch image URLs when category data is available
    }
  }, [services]);

  const getImage = async (url) => {
    let getUrl = await axios.get(`${baseURL}/get-presigned-url?url=${url}`);

    let imgUrl = getUrl?.data?.results?.presigned_url;
    return imgUrl;
  };
  return (
    <div className="servicePage">
      <Header />
      <div className="serviceContainer">
      <h1>Categories of Pooja</h1>
        {/* {console.log(selectedCats)} */}
        <div className="poojaCardContainer">
          {services.map((item) => (
            <div
              key={item?.id}
              className={
                // selectedCats.includes(item?.id)
                //   ? "selected poojaCard"
                  "poojaCard"
              }
            //   onClick={() => handleSelectCat(item.id)}
            >
              <div className="cardImg">
                <img src={imageUrls[item?.id]} alt={item?.name} />
              </div>
              <div className="cardInfo">
                <h3>
                  {item?.name}
                  <span>({item?.name_local_lang})</span>
                </h3>
                <p>{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="button">
          Next
        </button>
      </div>
    </div>
  );
};

export default ServicePage;
