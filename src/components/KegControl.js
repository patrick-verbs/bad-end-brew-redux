import { connect } from "react-redux";
import React from "react";
import NewKegForm from "./NewKegForm";
import KegList from "./KegList";
import KegDetail from "./KegDetail";
import EditKegForm from "./EditKegForm";
import PropTypes from "prop-types";

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedKeg: null,
      editing: false
    };
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.masterKegList[id];
    this.setState({selectedKeg: selectedKeg});
  }

  // The function to handle 'Add Keg' button click, below
  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const { id, name, brand, price, alcoholContent, pintsLeft } = newKeg;
    const action = {
      type: 'ADD_KEG',
      id: id,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintsLeft: pintsLeft,
    }
    dispatch(action);
    this.setState({
      formVisibleOnPage: false
      // ^ needs to be moved to the Redux store per project objectives
      // Not shown in the lesson: https://www.learnhowtoprogram.com/react/react-with-redux/adding-redux-to-react-part-2
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const { id, name, brand, price, alcoholContent, pintsLeft } = kegToEdit;
    const action = {
      type: 'ADD_KEG',
      id: id,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintsLeft: pintsLeft,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedKeg: null
    });
  }

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_KEG',
      id: id
    }
    dispatch(action);
    this.setState({selectedKeg: null});
  }

  handleSellingKeg = (kegToEdit) => {
    const { dispatch } = this.props;
    const { id, name, brand, price, alcoholContent, pintsLeft } = kegToEdit;
    const action = {
      type: 'ADD_KEG',
      id: id,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintsLeft: pintsLeft,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedKeg: kegToEdit
    });
  }
  // handleSellingKeg = (id) => {
  //   // const { dispatch } = this.props;
  //   const selectedKeg = this.props.masterKegList[id];
  //   console.log(selectedKeg)
  //   // const { name, brand, price, alcoholContent, pintsLeft } = selectedKeg;
  //   // const action = {
  //   //   type: 'ADD_KEG',
  //   //   id: id,
  //   //   name: name,
  //   //   brand: brand,
  //   //   price: price,
  //   //   alcoholContent: alcoholContent,
  //   //   pintsLeft: pintsLeft - 1,
  //   // }
  //   // if (selectedKeg.pintsLeft > 0) {
  //   //   dispatch(action);
  //   //   this.setState({
  //   //     selectedKeg: selectedKeg
  //   //   });
  //   // }
  // }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing ) {
      currentlyVisibleState = <EditKegForm
        keg = {this.state.selectedKeg}
        onEditKeg = {this.handleEditingKegInList}
      />;
      buttonText = "Return to Keg List";
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = <KegDetail
        keg = {this.state.selectedKeg}
        onClickingEdit = {this.handleEditClick}
        onClickingDelete = {this.handleDeletingKeg}
        onClickingSell = {this.handleEditingKegI}
      />;
      buttonText = "Return to Keg List";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm
        onNewKegCreation = {this.handleAddingNewKegToList}
      />;
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = <KegList
        kegList = {this.props.masterKegList}
        onKegSelection = {this.handleChangingSelectedKeg}
      />;
      buttonText = "Add Keg";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

KegControl.propTypes = {
  masterKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterKegList: state
  }
}

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;