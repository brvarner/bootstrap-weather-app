import React, { useEffect, useState } from "react";
import { request } from "../../helpers/request";

export default function Header() {
  const [city, setCity] = useState("");

  const debounce = (func, timeout = 600) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  let citySearch = (event) => {
    event.preventDefault();
    setCity(event.target.value);
    console.log(city, "1");
    debounce(() => console.log(city, "2"));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center title">Weather in</h1>
      <form className="search-location">
        <input
          type="text"
          name="city"
          placeholder="What City?"
          className="form-control text-muted form-rounded p-4 shadow"
          onKeyUp={(e) => citySearch(e)}
        />
      </form>
      <div className="card my-3 shadow-lg back-card">
        <div className="card-top text-center">
          <div className="city-name my-3">
            <p>Abuja</p>
            <span>...</span>
          </div>
          <img
            src="/img/night_image.svg"
            alt="Night time background."
            className="img-fluid card-img-top time"
          />
        </div>
        <div className="card-body">
          <div className="card-mid row">
            <div className="col-8 text-center temp">
              <span>30&deg;F</span>
            </div>
            <div className="col-4 condition-temp">
              <p className="condition">Thunder Storm</p>
              <p className="high">30&deg;F</p>
              <p className="low">23&deg;F</p>
            </div>
          </div>
        </div>
        <div className="icon-container card shadow mx-auto">
          <img src="img/cloud.svg" alt="Cloud" />
        </div>
        <div className="card-bottom px-5 py-4 row">
          <div className="col text-center">
            <p>30&deg;F</p>
            <span>Feels Like:</span>
          </div>
          <div className="col text-center">
            <p>55%</p>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
