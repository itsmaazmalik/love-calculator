import React, { useState } from "react";

const Home = () => {
  const [maleName, setMaleName] = useState("");
  const [femaleName, setFemaleName] = useState("");
  const [percentage, setPercentage] = useState([]);
  const [message, setMessage] = useState([]);

  const findPercentage = async () => {
    try {
      const API_URL = `https://love-calculator.p.rapidapi.com/getPercentage?sname=${femaleName}&fname=${maleName}`;
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
          "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_HOST}`,
        },
      });
      const data = await response.json();
      setPercentage(data.percentage);
      setMessage(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (maleName === "" || femaleName === "") {
      alert("Please Enter Name First");
    } else {
      findPercentage();
    }
  };

  return (
    <div className="container d-flex justify-content-center ">
      <div className="row">
        <div className="col col-lg-12">
          <h1
            className="mt-2 mb-2"
            style={{ fontWeight: "bold", color: "white" }}
          >
            Love Calculator
          </h1>
          <hr style={{ color: "white" }} />
          <form>
            <div className="mb-3 text-white">
              <label htmlFor="male-name" className="form-label">
                Male Name
              </label>
              <input
                value={maleName}
                onChange={(event) => setMaleName(event.target.value)}
                type="text"
                required
                className="form-control"
                id="male-name"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 text-white">
              <label htmlFor="female-name" className="form-label">
                Female Name
              </label>
              <input
                value={femaleName}
                onChange={(event) => setFemaleName(event.target.value)}
                type="text"
                required
                className="form-control"
                id="female-name"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Calculate
            </button>
          </form>
          <div className="container mt-4">
            <input
              disabled
              className="btn rounded-circle text-black"
              style={{
                backgroundColor: "#08f26e",
                width: "100px",
                height: "100px",
                fontSize: "30px",
                fontWeight: "bold",
                border: "none",
              }}
              type="text"
              value={percentage ? percentage + "%" : ""}
            />
          </div>
          <div className="container mt-3">
            <h3>{message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
