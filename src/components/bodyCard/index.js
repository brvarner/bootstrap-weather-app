import React from "react";

export default function BodyCard({ cityData, tempData }) {
  const isDayTime = (icon) => {
    if (icon.includes("d")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="card my-3 shadow-lg back-card">
      <div className="card-top text-center">
        <div className="city-name my-3">
          <p>{cityData ? cityData.name : "Enter City"}</p>
          <span>...</span>
        </div>
        <img
          //   src="/img/night_image.svg"
          src={
            isDayTime(cityData?.weather[0].icon)
              ? "/img/day_image.svg"
              : "/img/night_image.svg"
          }
          alt="Night time background."
          className="img-fluid card-img-top time"
        />
      </div>
      <div className="card-body">
        <div className="card-mid row">
          <div className="col-8 text-center temp">
            <span>{tempData?.currentTemp}&deg;F</span>
          </div>
          <div className="col-4 condition-temp">
            <p className="condition">{cityData?.weather[0].description}</p>
            <p className="high">{tempData?.high}&deg;F</p>
            <p className="low">{tempData?.low}&deg;F</p>
          </div>
        </div>
      </div>
      <div className="icon-container card shadow mx-auto">
        <img
          src={`http://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`}
          alt={`${cityData?.weather[0].description}`}
        />
      </div>
      <div className="card-bottom px-5 py-4 row">
        <div className="col text-center">
          <p>{tempData?.feelsLike}&deg;F</p>
          <span>Feels Like:</span>
        </div>
        <div className="col text-center">
          <p>{tempData?.humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
}
