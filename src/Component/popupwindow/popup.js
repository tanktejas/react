import React from "react";
import "./modlbox.css";
import url from "../../Images/imageforup.jfif";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Name = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="name">name:</label>
    <input
      id="name"
      type="text"
      onChange={onChange}
      maxlength="25"
      value={value}
      placeholder="Name of image"
      required
    />
  </div>
);

const Status = ({ onChange, clssname, value, date, onChange1 }) => (
  <div className="field" id={clssname}>
    <label htmlFor="status">description :</label>
    <input
      id="status"
      type="text"
      onChange={onChange}
      maxLength="35"
      value={value}
      placeholder="Small image description "
      required
    />
    <label htmlFor="status">Date :</label>

    <input
      id="date"
      type="date"
      value={date}
      onChange={onChange1}
      placeholder="enter date"
    />
  </div>
);

const Profile = ({ onSubmit, src, name, status }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Upload Your best Image/Art</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img for="photo-upload" src={src} />
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">
        Edit Profile{" "}
      </button>
    </form>
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form id="ff" onSubmit={onSubmit}>
      <h1>Upload Image/Art</h1>
      {children}
      <button type="submit" className="save">
        Save{" "}
      </button>
    </form>
  </div>
);

class CardProfile extends React.Component {
  state = {
    file: "",
    imagePreviewUrl: url,
    name: "",
    status: "",
    active: "edit",
    userdetail: "",
    date: "",
    user: "",
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  editName = (e) => {
    const name = e.target.value;
    this.setState({
      name,
    });
  };

  editStatus = (e) => {
    const status = e.target.value;
    this.setState({
      status,
    });
  };
  editdate = (e) => {
    const date = e.target.value;
    this.setState({
      date,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // let activeP = this.state.active === "edit" ? "profile" : "edit";
    // this.setState({
    //   active: activeP,
    // });
    let data = new FormData();
    data.append("file", this.state.file);
    const date = new Date(Date.now());
    if (this.state.file == "" || this.state.date == "") {
      alert(
        "please, enter all details of image which you want to upload.\nThank You."
      );
    } else if (this.state.date < date) {
      alert("Please, Enter valid date.");
    } else {
      var obj = new FormData();
      obj.append("file", this.state.file);
      obj.append("discription", this.state.status);
      obj.append("name", this.state.name);
      obj.append("date", this.state.date);
      obj.append("usermail", this.props.user.email);
      obj.append("nameofuser", this.props.user.name);

      // call to s3 server image
      axios({
        method: "POST",
        url: "http://localhost:3004/upload",
        data: obj,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        // then print response status
        console.warn(res);
        // if (res.data.success === 1) {
        //   setSuccess("Image upload successfully");
        // }
      });
    }
  };

  render() {
    const { imagePreviewUrl, name, status, active, date } = this.state;
    return (
      <div>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <Name onChange={this.editName} value={name} />
            <Status
              onChange={this.editStatus}
              clssname="dis"
              value={status}
              date={date}
              onChange1={this.editdate}
            />
          </Edit>
        ) : (
          <Profile
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            name={name}
            status={status}
          />
        )}
      </div>
    );
  }
}

export default CardProfile;
