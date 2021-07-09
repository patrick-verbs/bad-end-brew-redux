import React from "react";
import PropTypes from "prop-types";
import Keg from "./Keg";

function KegList(props){
  return (
    <React.Fragment>
      <hr />
      {props.kegList.map((keg) =>
      // ^ loops through the list passed down by KegControl
        <Keg
          whenKegClicked = { props.onKegSelection }
          name={keg.name}
          brand={keg.brand}
          price={keg.price}
          alcoholContent={keg.alcoholContent}
          pintsLeft={keg.pintsLeft}
          id={keg.id}
          key={keg.id}
        />
      )}
    </React.Fragment>
  );
}

KegList.propTypes = {
  kegList: PropTypes.array,
  onKegSelection: PropTypes.func
}

export default KegList;