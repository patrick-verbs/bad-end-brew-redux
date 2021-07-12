import React from "react";
import PropTypes from "prop-types";
import Keg from "./Keg";

function KegList(props){
  return (
    <React.Fragment>
      <hr />
      {Object.values(props.kegList).map((keg) =>
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
  kegList: PropTypes.object,
  onKegSelection: PropTypes.func
}

export default KegList;