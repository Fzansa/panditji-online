import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../utils/constants";
import Header from "../../components/header/Header";
import "./categoryPage.css";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCats, setSelectedCats] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setCategory(response?.data?.results?.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Handle error
      }
    };

    // Call the function
    fetchData();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        category.map(async (item) => {
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

    if (category.length > 0) {
      fetchImageUrls(); // Fetch image URLs when category data is available
    }
  }, [category]);

  const getImage = async (url) => {
    let getUrl = await axios.get(`${baseURL}/get-presigned-url?url=${url}`);

    let imgUrl = getUrl?.data?.results?.presigned_url;
    return imgUrl;
  };
  const handleNext = () => {
    if (selectedCats.length > 0) {
      navigate("/service", { state: selectedCats });
    } else {
      alert("select at least one Category");
    }
  };

  const handleSelectCat = (catId) => {
    if (!selectedCats.includes(catId)) {
      setSelectedCats((prev) => [...prev, catId]);
    } else {
      setSelectedCats((prev) => prev.filter((item) => item !== catId));
    }
  };

  return (
    <div className="categoryPage">
      <Header />
      <div className="categoryContainer">
        <h1>Categories of Pooja</h1>
        {console.log(selectedCats)}
        <div className="poojaCardContainer">
          {category.map((item) => (
            <div
              key={item?.id}
              className={
                selectedCats.includes(item?.id)
                  ? "selected poojaCard"
                  : "poojaCard"
              }
              onClick={() => handleSelectCat(item.id)}
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
        <button className="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
