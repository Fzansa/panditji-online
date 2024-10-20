import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./panditServicePage.css";
import axios from "axios";
import { baseURL } from "../../utils/constants";

const PanditServicePage = () => {
  let [myServices, setMyServices] = useState([]);
  let [imageUrls,setImageUrls]=useState({})
  useEffect(() => {
    try {
      const getServices = async () => {
        let res = await axios.get(`${baseURL}/pandit/service`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res?.status === 200) {
          setMyServices(res?.data?.results?.data);
        }
      };

      getServices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        myServices.map(async (item) => {
          const imgUrl = await getImage(item?.logo_image);
          return { id: item?.id, imgUrl };
        })
      );

      const urlMap = {};
      urls.forEach((u) => {
        urlMap[u.id] = u.imgUrl;
      });
      setImageUrls(urlMap);
    };

    if (myServices.length > 0) {
      fetchImageUrls(); // Fetch image URLs when category data is available
    }
  }, [myServices]);

  const getImage = async (url) => {
    let getUrl = await axios.get(`${baseURL}/get-presigned-url?url=${url}`);
    let imgUrl = getUrl?.data?.results?.presigned_url;
    return imgUrl;
  };
  return (
    <div className="panditServicePage">
      <Header />
      <div className="categoryContainer">
        <h1>My Services</h1>
        <div className="poojaCardContainer">
          {myServices.map((item) => (
            <div
              key={item?.id}
              className={
                   "poojaCard"
              }
            >
              <div className="cardImg">
                <img src={imageUrls[item?.id]} alt={item?.name} />
              </div>
              <div className="cardInfo">
                <h3>
                  {item?.name}
                  <span>({item?.name_local_lang})</span>
                </h3>
                <p className="pDesc" >{item?.description}</p>
                <div className="moreInfo">
                    <span className="headingInfo" >Dakshina</span>
                    <span>₹ {item?.dakshina}</span>
                </div>
                <div className="moreInfo">
                    <span className="headingInfo" >Duration</span>
                    <span>{item?.duration} Hours</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanditServicePage;
