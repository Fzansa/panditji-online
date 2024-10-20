import { useEffect, useState } from "react";
import "./servicePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import Header from "../../components/header/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import ServiceNumber from "../../components/servicesNumber/ServiceNumber";

const ServicePage = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const selectedCategories = location.state;

  useEffect(() => {
    try {
      const fetchServices = async () => {
        const filter = { category: selectedCategories };
        const filterQuery = JSON.stringify(filter);
        const encodedFilter = encodeURIComponent(filterQuery);
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
  }, [selectedCategories]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        services.map(async (item) => {
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

    if (services.length > 0) {
      fetchImageUrls(); // Fetch image URLs when category data is available
    }
  }, [services]);


  const getImage = async (url) => {
    let getUrl = await axios.get(`${baseURL}/get-presigned-url?url=${url}`);
    let imgUrl = getUrl?.data?.results?.presigned_url;
    return imgUrl;
  };

  const handleGoBack = () => {
    navigate("/category");
  };

  const handleSelectService = (service) => {
    // Check if the service is already selected
    const isServiceSelected = selectedServices.find(
      (s) => s.service === service.id
    );

    if (isServiceSelected) {
      // If the service is already selected, remove it from the selectedServices array (unselect it)
      setSelectedServices(
        selectedServices.filter((s) => s.service !== service.id)
      );
    } else {
      // If the service is not selected, add it to the selectedServices array (select it)
      setSelectedServices([
        ...selectedServices,
        {
          service: service.id,
          dakshina: "",
          duration: "",
          category: selectedCategories[0],
        },
      ]);
    }
  };

  // Handle input changes for dakshina and duration
  const handleInputChange = (id, field, value) => {
    const updatedServices = selectedServices.map((service, i) => {
      if (service.service === id) {
        return { ...service, [field]: value }; // Update the specific field (dakshina or duration)
      }
      return service;
    });
    setSelectedServices(updatedServices); // Update state with new values
  };

  // Get selected service details by ID
  const getSelectedService = (serviceId) => {
    return selectedServices.find((s) => s.service === serviceId);
  };

  const handleSubmit = async () => {
    try {
      if (selectedServices.length > 0) {
        const dataToSend = selectedServices.map((service) => ({
          service: parseInt(service.service), // Service ID
          dakshina: parseFloat(service.dakshina), // Ensure dakshina is a number
          duration: service.duration, // Duration as a string
          category: parseInt(service.category), // Category ID
        }));
        let response = await axios.post(
          `${baseURL}/pandit/service`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        navigate('/success',{ state: response?.data?.message })
      } else {
        alert("Select at least one Service");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message)
    }
  };

  return (
    <div className="servicePage">
      <span className="goBackBtn" onClick={handleGoBack}>
        <FaArrowLeftLong />
      </span>
      <Header />
      <div className="serviceContainer">
        <h1>Select Services</h1>
        <div className="poojaCardContainer">
          {services.map((item, index) => (
            <div
              key={item?.id}
              className={
                getSelectedService(item?.id)
                  ? "selected poojaCard"
                  : "poojaCard"
              }
              onClick={() => handleSelectService(item)}
            >
              <div className="cardImg">
                <img src={imageUrls[item?.id]} alt={item?.name} />
              </div>
              <div className="cardInfo">
                <h3>
                  {item?.name}
                  <span>({item?.name_local_lang})</span>
                </h3>
                <div className="serviceForm">
                  <input
                    type="text"
                    value={getSelectedService(item?.id)?.duration}
                    placeholder="Add hours"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleInputChange(item?.id, "duration", e.target.value)
                    }
                    readOnly={readOnly}
                  />
                  <input
                    type="text"
                    value={getSelectedService(item?.id)?.dakshina}
                    placeholder="Add price"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleInputChange(item?.id, "dakshina", e.target.value)
                    }
                    readOnly={readOnly}
                  />
                  <button
                    className={
                      getSelectedService(item?.id)
                        ? "serviceEditBtn selected"
                        : "serviceEditBtn"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setReadOnly(!readOnly);
                    }}
                  >
                    <CiEdit className="pen" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="button large" onClick={handleSubmit}>
          Add to my Services
        </button>
        <div className="showServiceNumber">
          <ServiceNumber services={selectedServices} />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
