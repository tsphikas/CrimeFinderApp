import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";

import MapView, { Marker } from "react-native-maps";
import axios from "axios";

import CrimeArray from "./components/CrimeArray";
import ModifiedMarker from "./components/ModifiedMarker";

export default function App() {
  // The things we need to track in state for MAPS
  const { height, width } = Dimensions.get("window");
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  // This will need changing info from user location or user input

  //Region & Zoom Setting
  const [center, setCenter] = useState({
    LATITUDE: 52.571834,
    LONGITUDE: -1.836625,
  });
  const LATITUDE_DELTA = 0.4;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const gridMap = [52.731, -2.267, 52.76, -1.17, 52.3681, -1.163];
  //Get User Location

  // SET DYNAMICALLY
  const [clickedLatLng, setClickedLatLng] = useState(null);

  // Things we need to track state for POLICE API using Axios
  const [loading, setLoading] = useState(false);
  // POSTS BEING CALLED MULTIPLE TIMES POSSIBLE DUE TO USEEFFECT

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      setLoading(true);

      //Take position and map by grid

      // Await make wait until that
      // promise settles and return its result
      const response = await axios.get(
        `https://data.police.uk/api/crimes-street/all-crime?poly=${gridMap[0]},${gridMap[1]}:${gridMap[2]},${gridMap[3]}:${gridMap[4]},${gridMap[5]}`
      );
      //`https://data.police.uk/api/crimes-street/all-crime?lat=${center.LATITUDE}&lng=${center.LONGITUDE}`
      /* https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592*/
      // After fetching data store it in posts state.
      setPosts(response.data);
      // Closed the loading page
      setLoading(false);
    };
    // Call the function
    loadPost();
  }, []);

  //Modifies Array to suit Google Map Requirements
  const crimeMapArr = CrimeArray(posts);

  /* posts[index].outcome_status */
  // WILL REQUIRE MORE INFO FROM POLICE API TO POPULATE POP UP

  // Load the Google maps scripts
  /*  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "",
  }); */

  //Set Bounds of maps remove place and replace
  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    //setCenter(place.pos)
  };

  // Set icon function
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: center.LATITUDE,
          longitude: center.LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {crimeMapArr.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.pos}
            //title={marker.title}
            //description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
