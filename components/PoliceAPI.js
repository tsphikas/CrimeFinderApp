import React, { useEffect } from "react";
import axios from "axios";

// UseEffect hook for fetching data
// POSSIBLE ERROR IN HANDLING RESULTING IN MULTIPLE CALLS
// ASYNC AWAIT MAY NEED REWRITING

const PoliceAPI = () => {
  useEffect(() => {
    const loadPost = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      console.log("1");
      setLoading(true);

      // Await make wait until that
      // promise settles and return its result
      console.log("2");
      const response = await axios.get(
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.48622&lng=-2.04398"
      );

      /* https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592  
     https://jsonplaceholder.typicode.com/posts/*/
      // After fetching data store it in posts state.
      console.log("3");

      setPosts(response.data);

      // Closed the loading page
      console.log("4");
      setLoading(false);
    };

    // Call the function

    loadPost();
  }, []);
};

export default PoliceAPI;

// FETCH LIMIT URGENTLY REQUIRED LONDON CRASHES SYSTEM

// SVG ICON SETTER FOR MAP PINS
//const iconSetter = () =>{};
