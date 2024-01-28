import axios from "axios";
import { useEffect, useState } from "react";
import "./profile.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Camera from "@mui/icons-material/Camera";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_ENDPOINT = `${config.baseURL}${config.apiEndpoint}/adminUpdateProfile`;
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showUpdateResults, setShowUpdateResults] = React.useState(false);
  //   const onEditButtonClick = () => setShowUpdateResults(!showUpdateResults);
  useEffect(() => {
    // console.log(routeLocation.state.gym);
    getProfile();
  }, []);

  const getProfile = async () => {
    const res = await axios.get(
      `${config.baseURL}${config.apiEndpoint}/getAdminUserProfile`
    );
    console.log("data", res);
    setEmail(res.data.AdminData[0].email);
    setName(res.data.AdminData[0].name);
    setPassword(res.data.AdminData[0].password);
    setPhone(res.data.AdminData[0].phoneNumber);
  };

  const handleForm = async (data) => {
    event.preventDefault();
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phoneNumber", phone);
    data.append("password", password);
    // data.append("expireAt", expireAt);

    var config = {
      method: "post",
      url: API_ENDPOINT,
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Profile Updated Successfully");
        // navigate('/coupan')
      })
      .catch(function (error) {
        window.alert("error");
        // console.log(error);
      });
  };

  const EditResults = () => (
    <form onSubmit={handleForm}>
      <div className="grid-65">
        <label htmlFor="fname">Name</label>

        <input
          type="text"
          className="input"
          id="fname"
          tabIndex="1"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid-65">
        <label htmlFor="lname">Email</label>

        <input
          type="email"
          className="input"
          id="lname"
          tabIndex="2"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid-65">
        <label htmlFor="lname">Phone</label>

        <input
          type="number"
          className="input"
          id="lname"
          tabIndex="2"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="grid-65">
        <label htmlFor="lname">Password</label>
        <input
          type="text"
          className="input"
          id="lname"
          tabIndex="2"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <fieldset> */}
      {/*<input type="button" className="Btn cancel input" value="Cancel" />*/}
      <input type="submit" className="Btn input" value="Update Profile" />
      {/* </fieldset> */}
    </form>
  );

  // const submitHandle = (e) => {
  //     e.preventDefault();
  //     alert(true);
  // }
  return (
    <>
      <div className="wrapper1">
        <div className="profiless">
          <div className="content">
            <div>
              {/* <h1 >
                            <IconButton aria-label="expand row" onClick={onEditButtonClick} fontSize="large">
                                <Camera />
                            </IconButton>
                            Edit Profile 
    </h1>*/}
              {/*showUpdateResults ? <EditResults /> : null*/}
              <EditResults />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
