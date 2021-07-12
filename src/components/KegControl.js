import { connect } from "react-redux";
import React from "react";
import NewKegForm from "./NewKegForm";
import KegList from "./KegList";
import KegDetail from "./KegDetail";
import EditKegForm from "./EditKegForm";

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterKegList: [],
      // ^ will be passed down as a prop to KegList in the render() else-branch
      selectedKeg: null,
      editing: false
    };
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
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
    const newMasterKegList = this.state.masterKegList.concat(newKeg);
    this.setState({
      masterKegList: newMasterKegList,
      formVisibleOnPage: false
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached :P");
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const editedMasterKegList = this.state.masterKegList
      .filter(keg => keg.id !== this.state.selectedKeg.id)
      .concat(kegToEdit);
    this.setState({
      masterKegList: editedMasterKegList,
      editing: false,
      selectedKeg: null
    });
  }

  handleDeletingKeg = (id) => {
    const newMasterKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: newMasterKegList,
      selectedKeg: null
    });
  }

  handleSellingKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id !== id)[0];
    if (selectedKeg.pintsLeft > 0) {
      selectedKeg.pintsLeft -= 1;
      this.setState({
        selectedKeg: selectedKeg
      });
    }
  }

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
        onClickingSell = {this.handleSellingKeg}
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
        kegList = {this.state.masterKegList}
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

KegControl = connect()(KegControl);

export default KegControl;