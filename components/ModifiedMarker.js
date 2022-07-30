// Crime Types for icon
/*other-crime, violent-crime, vehicle-crime, theft-from-the-person,
    shoplifting, robbery, public-order, possession-of-weapon,
    other-theft, drugs, criminal-damage-arson, burglary, bicycle-theft,
    anti-social-behaviour
     */

//jsonplaceholder.typicode.com/posts/*/
import { Marker } from "react-native-maps";

const ModifiedMarker = (props) => {
  return (
    <Marker
      key={props.id}
      coordinate={props.pos}
      //title={marker.title}
      //description={marker.description}
    ></Marker>
  );
};

export default ModifiedMarker;
