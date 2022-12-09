import React, { useEffect, useState } from "react";
import { request } from "../../helpers/request";
import BodyCard from "../bodyCard";
import debounce from "lodash.debounce";

export default function Header() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState();
  const [tempData, setTempData] = useState();

  const updateCitySearch = async (event) => {
    setCity(event.target.value);
  };

  const requester = async (city) => {
    setCityData(await request(city));
  };

  const fahrenheitConverter = (tempObj) => {
    if (tempObj) {
      let currentTempK = tempObj.temp;
      let feelsLikeK = tempObj.feels_like;
      let highK = tempObj.temp_max;
      let lowK = tempObj.temp_min;
      let humidity = tempObj.humidity;

      let currentTemp = Math.round((currentTempK * 9) / 5 - 459.67);
      let feelsLike = Math.round((feelsLikeK * 9) / 5 - 459.67);
      let high = Math.round((highK * 9) / 5 - 459.67);
      let low = Math.round((lowK * 9) / 5 - 459.67);

      setTempData({
        currentTemp,
        feelsLike,
        high,
        low,
        humidity,
      });
    }
  };

  const debouncedOnChange = debounce(updateCitySearch, 400);

  //   This useEffect triggers whenever the city changes, since it's debounced
  //  that means that we don't have multiple requests running every time the user types.
  useEffect(() => {
    if (city !== "") {
      requester(city);
    }
  }, [city]);

  useEffect(() => {
    if (cityData) {
      fahrenheitConverter(cityData?.main);
    }
  }, [cityData]);

  return (
    <div className="container my-5">
      <h1 className="text-center title">Weather in</h1>
      <form className="search-location">
        <input
          type="text"
          name="city"
          placeholder="What City?"
          className="form-control text-muted form-rounded p-4 shadow"
          onKeyUp={debouncedOnChange}
        />
      </form>
      {cityData ? <BodyCard cityData={cityData} tempData={tempData} /> : null}
    </div>
  );
}
