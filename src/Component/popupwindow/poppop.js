import React from "react";
import "./poppop.css";
import CardProfile from "../popupwindow/popup";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Modal isOpen={this.props.state} onClose={() => this.closeModal()}>
          <CardProfile user={this.props.user} />
        </Modal>
      </div>
    );
  }

  closeModal() {
    this.props.setstate(false);
  }
}

class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false) return null;

    return (
      <div>
        <div className="modal">{this.props.children}</div>
        <div className="bg" onClick={(e) => this.close(e)} />
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default App;
