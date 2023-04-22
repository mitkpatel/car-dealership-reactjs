import { React, useState } from "react";

const CarDetails = ({ fetchData }) => {
  console.log("selected car", fetchData);

  return (
    <div>
      {console.log("valkue", fetchData.id)}
      {fetchData ? (
        <>
          {" "}
          <h1>Here is the details for the car</h1>
          <p>Car ID: {fetchData.id}</p>
          <p>Car Make: {fetchData.make}</p>
          <p>Car Model: {fetchData.model}</p>
          <p>Car Color: {fetchData.color}</p>
          <p>Car Kms: {fetchData.kms}</p>
          <p>Car Price: {fetchData.price}</p>
          <p>Car Vin: {fetchData.vin}</p>
          <p>Car Year: {fetchData.year}</p>
          <div className="grid grid-cols-4 px-4">
            {fetchData.images ? (
              fetchData.images.map((image) => (
                <div>
                  <img
                    src={image}
                    alt="car_image"
                    className="object-cover w-48 h-48 rounded-md mx-4"
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <p>No data selected</p>
      )}
    </div>
  );
};

export default CarDetails;
