import React from "react";
import ReactQuill from "react-quill";
import "../../../../node_modules/react-quill/dist/quill.snow.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Stack from "@mui/material/Stack";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Multiselect } from "multiselect-react-dropdown";
import config from "../../../config";
const API_ENDPOINT1 = `${config.baseURL}${config.apiEndpoint}/updateGymSevice`;
const API_ENDPOINT2 = `${config.baseURL}${config.apiEndpoint}/getAllGymBranch`;
const theme = createTheme();

const EditServices = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [price, setprice] = useState("");

  const [Deliverables, setDeliverables] = useState("");

  // ============================================FITNESS STATES START================================================================
  const [branch, setBranch] = useState("");

  const [branch2, setBranch2] = useState([]);

  const [branchInfo, setBranchInfo] = useState("");

  const [demoDate, setDemoDate] = React.useState("");
  const [demoTime, setDemoTime] = React.useState("");

  const [packageDate, setPackageDate] = React.useState("");
  const [packageTime, setPackageTime] = React.useState("");

  const [packageDuration, setPackageDuration] = React.useState("");

  const [slotDuration, setSlotDuration] = React.useState("");
  const [priceOneMonth, setpriceOneMonth] = React.useState("");
  const [priceTwoMonth, setpriceTwoMonth] = React.useState("");
  const [priceThreeMonth, setpriceThreeMonth] = React.useState("");
  const [priceSixMonth, setpriceSixMonth] = React.useState("");
  const [priceTwelveMonth, setpriceTwelveMonth] = React.useState("");

  const [managerNumber, setManagerNumber] = useState("");
  const [managertime1, setManagerTime1] = React.useState("");
  const [managertime2, setManagerTime2] = React.useState("");

  const [bodyfitness, setbodyfitness] = useState("");

  const [coachName, setcoachName] = useState("");
  const [coachNumber, setcoachNumber] = useState("");

  const [Id, setIds] = useState("");
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    console.log(param);
    // setIds(param)
  }
  const routeLocation = useLocation();
  useEffect(() => {
    console.log("data", routeLocation.state.gym);
    setIds(routeLocation.state.gym.id);
    setdescription(routeLocation.state.gym.description);
    setprice(routeLocation.state.gym.price);
    settitle(routeLocation.state.gym.title);
    setcategory(routeLocation.state.gym.category);
    setBranch(
      routeLocation.state.gym.branch_id.length > 0
        ? routeLocation.state.gym.branch_id[0]._id
        : ""
    );
    setpriceOneMonth(routeLocation.state.gym.priceOneMonth);
    setpriceTwoMonth(routeLocation.state.gym.priceTwoMonth);
    setpriceThreeMonth(routeLocation.state.gym.priceThreeMonth);
    setpriceSixMonth(routeLocation.state.gym.priceSixMonth);
    setpriceTwelveMonth(routeLocation.state.gym.priceTwelveMonth);
    setManagerNumber(routeLocation.state.gym.manager_contact_no);
    setcoachNumber(routeLocation.state.gym.manager_contact_no);
    setcoachName(routeLocation.state.gym.manager_name);
    setbodyfitness(routeLocation.state.gym.description);
    setimage(routeLocation.state.gym.image);
    setSlotDuration(routeLocation.state.gym.slotTime);
    // setBodyD
    setDeliverables(routeLocation.state.gym.delievrables);

    // bodyfitness

    // setimage(routeLocation.state.gym.image)
  }, []);

  const TimeChange11 = (newValue) => {
    setManagerTime1(newValue);
  };
  const TimeChange22 = (newValue) => {
    setManagerTime2(newValue);
  };

  let durationArray = [
    "1 Month",
    // "2 Months",
    // "3 Months",
    // "4 Months",
    // "5 Months",
    // "6 Months",
    // "7 Months",
    // "8 Months",
    // "9 Months",
    // "10 Months",
    // "11 Months",
  ];

  let slotArray = [
    "09:00am - 10:00am",
    "10:00am - 11:00am",
    "11:00am - 12:00pm",
    "12:00pm - 01:00pm",
    "01:00pm - 02:00pm",
    "02:00pm - 03:00pm",
    "03:00pm - 04:00pm",
    "04:00pm - 05:00pm",
    "05:00pm - 06:00pm",
    "06:00pm - 07:00pm",
    "07:00pm - 08:00pm",
    "08:00pm - 09:00pm",
    "09:00pm - 10:00pm",
    "10:00pm - 11:00pm",
  ];

  const [id, setId] = React.useState();

  const DateChange = (newValue) => {
    setDemoDate(newValue);
  };
  const TimeChange = (newValue) => {
    setDemoTime(newValue);
  };

  const DateChange2 = (newValue) => {
    setPackageDate(newValue);
  };
  const TimeChange2 = (newValue) => {
    setPackageTime(newValue);
  };
  //=========================================new requirement clients start ====================================================

  // const [ fitnessBox , setFitnessBox] = useState(true);
  const [chooseBranch, setChooseBranch] = useState(false);
  const [choosePrice, setChoosePrice] = useState("");
  const [chooseDuration, setChooseDuration] = useState(false);
  const [Preprice, setPreprice] = useState("");
  const [branchTime, setBranchTime] = useState("");
  const [branchId, setBranchId] = useState([]);

  //===============================================New req clients end======================================

  // ==============================================FITNESS STATES END================================================================

  const [academydate, setAcademydate] = useState("");
  const [academytime, setAcademytime] = useState("");
  const [academyprice, setacademyprice] = useState("");

  const [wellnessdate, setwellnessdate] = useState("");
  const [booktime, setbooktime] = useState("");

  const [wellnessbookdate, setwellnessbookdate] = useState("");
  const [wellnessbooktime, setwellnessbooktime] = useState("");
  const [wellnessbookprice, setWellnessBookprice] = useState("");

  const WellnessBookDateChange = (newValue) => {
    setwellnessbookdate(newValue);
  };

  const WellnessBookTimeChange = (newValue) => {
    setwellnessbooktime(newValue);
  };

  const AcedemyTimeChange = (newValue) => {
    setAcademytime(newValue);
  };
  const AcademyDateChange = (newValue) => {
    setAcademydate(newValue);
  };

  const BookTimeChange = (newValue) => {
    setbooktime(newValue);
  };
  const WellnessDateChange = (newValue) => {
    setwellnessdate(newValue);
  };

  const welnessCheckChange = (event) => {
    setwelnesschecked(event.target.checked);
  };
  const welnessFeeChange = (event) => {
    setwelnessfeechecked(event.target.checked);
  };

  const [welnesschecked, setwelnesschecked] = useState("");
  const [welnessfeechecked, setwelnessfeechecked] = useState("");
  // const [wellnessDescription, setwellnessDescription] = useState("");

  // ===========================================================================

  const runWellnessApi = async () => {
    if (title != "" && image != "" && description != "" && Deliverables != "") {
      console.log("You ran Wellness api");
      console.log("title-->", title);
      console.log("image-->", image);
      console.log("description-->", description);
      console.log("deliverables -->", Deliverables);
      console.log("consultation time-->", booktime);
      console.log("price-->", wellnessbookprice);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      data.append("image", image);
      data.append("delievrables", Deliverables);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      console.log({ data: JSON.stringify(data) });
      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("RESPONNSEEEE--->", response);
          window.alert("success");
          navigate("/services");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };
  const runWellnessApiPart2 = async () => {
    if (title != "" && image != "" && body != "" && bodyD != "") {
      console.log("You ran Wellness api");
      console.log("title-->", title);
      console.log("image-->", image);
      console.log("description-->", body);
      console.log("deliverables -->", bodyD);

      console.log("price-->", wellnessbookprice);

      console.log("package duration-->", packageDuration);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("description", body);
      data.append("category", category);
      data.append("image", image);
      data.append("delievrables", bodyD);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("RESPONNSEEEE--->", response);
          window.alert("success");
          setPackageDuration("");
          setPackageDate("");
          setPackageTime("");
          setprice("");
          setDemoDate("");
          setManagerNumber("");
          setdescription("");
          setDeliverables("");
          setChooseBranch("");
          setChoosePrice("");
          setChooseDuration("");
          setAcademydate("");
          setAcademytime("");
          setacademyprice("");
          setcoachName("");
          setcoachNumber("");
          setwellnessdate("");
          setbooktime("");
          setwellnessbookdate("");
          setwellnessbooktime("");
          setWellnessBookprice("");
          setwelnesschecked("");
          setwelnessfeechecked("");
          setSlotDuration("");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };

  const runAcademyApi = async () => {
    console.log("You ran Academy api");
    console.log("title-->", title);
    console.log("image-->", image);
    console.log("description-->", bodyacademy);
    console.log("deliverables -->", bodyacademyy);
    console.log("package date-->", academydate);
    console.log("package time-->", academytime);
    console.log("price-->", academyprice);
    console.log("coach name-->", coachName);
    console.log("coach number-->", coachNumber);

    if (
      title != "" &&
      image != "" &&
      bodyacademy != "" &&
      bodyacademyy != "" &&
      coachName != "" &&
      coachNumber != ""
    ) {
      console.log("You ran Academy api");
      console.log("title-->", title);
      console.log("image-->", image);
      console.log("description-->", bodyacademy);
      console.log("deliverables -->", bodyacademyy);
      console.log("package date-->", academydate);
      console.log("package time-->", academytime);
      console.log("price-->", academyprice);
      console.log("coach name-->", coachName);
      console.log("coach number-->", coachNumber);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("description", bodyacademy);
      data.append("category", category);
      data.append("image", image);
      data.append("delievrables", bodyacademyy);
      data.append("coachName", coachName);
      data.append("contact_no", coachNumber);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("RESPONNSEEEE--->", response);
          window.alert("success");
          navigate("/services");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };
  const runAcademyApiPart2 = async () => {
    if (
      title != "" &&
      image != "" &&
      bodyacademy != "" &&
      bodyacademyy != "" &&
      coachName != "" &&
      coachNumber != ""
    ) {
      console.log("You ran Academy api");
      console.log("title-->", title);
      console.log("image-->", image);
      console.log("description-->", bodyacademy);
      console.log("deliverables -->", bodyacademyy);
      console.log("package date-->", academydate);
      console.log("package time-->", academytime);
      // console.log("price-->", academyprice);
      console.log("coach name-->", coachName);
      console.log("coach number-->", coachNumber);
      // data.append("slotTime",slotDuration);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("description", bodyacademy);
      data.append("category", category);
      data.append("image", image);
      data.append("delievrables", bodyacademyy);
      data.append("coachName", coachName);
      data.append("contact_no", coachNumber);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("RESPONNSEEEE--->", response);
          window.alert("success");
          setPackageDuration("");
          setPackageDate("");
          setPackageTime("");
          setprice("");
          setDemoDate("");
          setManagerNumber("");
          setdescription("");
          setChooseBranch("");
          setChoosePrice("");
          setChooseDuration("");
          setAcademydate("");
          setAcademytime("");
          setacademyprice("");
          setcoachName("");
          setcoachNumber("");
          setwellnessdate("");
          setbooktime("");
          setwellnessbookdate("");
          setwellnessbooktime("");
          setWellnessBookprice("");
          setwelnesschecked("");
          setwelnessfeechecked("");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };

  const runFitnessApi = async () => {
    console.log("slotDuration", slotDuration);
    console.log("title", title);
    console.log("image", image);
    console.log("bodyfitness", bodyfitness);
    console.log("branch", branch);
    console.log("managerNumber", managerNumber);

    if (
      title != "" &&
      image != "" &&
      bodyfitness != "" &&
      branch != "" &&
      managerNumber != "" &&
      slotDuration != ""
    ) {
      console.log("You ran Fitness api");
      console.log("title =>", title);
      console.log("category =>", category);
      console.log("image=>", image);
      console.log("description=>", bodyfitness);
      console.log("demo date=>", demoDate);
      console.log("demo time=>", demoTime);

      console.log("duration=>", packageDuration);
      console.log("manager number=>", managerNumber);
      console.log("branch id=>", branch);
      console.log("branch price=>", choosePrice);
      console.log("slot Times", slotDuration);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("hiddenImageUrl", image);

      data.append("image", image);
      data.append("description", bodyfitness);
      data.append("category", category);
      data.append("branch_id", branch);
      if (demoDate != "" && demoTime != "") {
        data.append("demoDate", demoDate);
        data.append("demoTime", demoTime);
      }
      data.append("packageDuration", packageDuration);
      data.append("manager_contact_no", managerNumber);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (response.data.success === true) {
            console.log("RESPONNSEEEE--->", response);
            window.alert("success");
            navigate("/services");
          } else {
            alert("something went wrong");
          }
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };
  const runFitnessApiPart2 = async () => {
    if (
      title != "" &&
      image != "" &&
      bodyfitness != "" &&
      branch != "" &&
      managerNumber != "" &&
      slotDuration != ""
    ) {
      console.log("You ran Fitness api");
      console.log("title =>", title);
      console.log("category =>", category);
      console.log("image=>", image);
      console.log("description=>", bodyfitness);
      console.log("demo date=>", demoDate);
      console.log("demo time=>", demoTime);

      console.log("duration=>", packageDuration);
      console.log("manager number=>", managerNumber);
      console.log("branch id=>", branch);
      console.log("branch price=>", price);

      let data = new FormData();
      data.append("id", Id);
      data.append("title", title);
      data.append("price", price);
      data.append("image", image);
      data.append("description", bodyfitness);
      data.append("category", category);
      data.append("branchesID_Array", JSON.stringify([branch]));
      if (demoDate != "" && demoTime != "") {
        data.append("demoDate", demoDate);
        data.append("demoTime", demoTime);
      }
      data.append("packageDuration", packageDuration);
      data.append("manager_contact_no", managerNumber);
      data.append("slotTime", slotDuration);
      data.append("priceOneMonth", priceOneMonth);
      data.append("priceTwoMonth", priceTwoMonth);
      data.append("priceThreeMonth", priceThreeMonth);
      data.append("priceSixMonth", priceSixMonth);
      data.append("priceTwelveMonth", priceTwelveMonth);

      let config = {
        method: "put",
        url: API_ENDPOINT1,
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("RESPONNSEEEE--->", response);
          window.alert("You can add new branch details now");
          // MAKE STATES NULL

          setPackageDuration("");
          setPackageDate("");
          setPackageTime("");
          setprice("");
          setDemoDate("");
          setManagerNumber("");
          setdescription("");
          setChooseBranch("");
          setChoosePrice("");
          setChooseDuration("");
          setAcademydate("");
          setAcademytime("");
          setacademyprice("");
          setcoachName("");
          setcoachNumber("");
          setwellnessdate("");
          setbooktime("");
          setwellnessbookdate("");
          setwellnessbooktime("");
          setWellnessBookprice("");
          setwelnesschecked("");
          setwelnessfeechecked("");

          document.getElementById("branch").selectedIndex = 0;
          document.getElementById("one-month").value = "";
          document.getElementById("two-month").value = "";
          document.getElementById("three-month").value = "";
          document.getElementById("six-month").value = "";
          document.getElementById("tweleve-month").value = "";
          document.getElementById("managerNumber").value = "";
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error");
        });
    } else window.alert("Please input all required fields!");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (category === "fitness") {
      console.log("checking for api run");
      runFitnessApi();
    } else if (category === "academy") {
      console.log("checking for acadamy api run");
      runAcademyApi();
    } else if (category === "wellness") {
      runWellnessApi();
    }
  };
  const onSubmitPart2 = async (data) => {
    // event.preventDefault();
    if (category === "fitness") {
      console.log("checking for fitness api run");
      runFitnessApiPart2();
    } else if (category === "academy") {
      console.log("checking for  academy api run");

      runAcademyApiPart2();
    } else if (category === "wellness") {
      console.log("checking for wellness api run");

      runWellnessApiPart2();
    }
  };

  const getBranches = async () => {
    let res = await axios.get(API_ENDPOINT2);

    console.log("responce=============->", res.data.getAllGymBranch);

    const modifiedData = res.data.getAllGymBranch.reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.branchName}`,
          id: current._id,
          opening_branchTiming: new Date(
            current.opening_branchTiming
          ).toLocaleTimeString(),
          closing_branchTiming: new Date(
            current.closing_branchTiming
          ).toLocaleTimeString(),
        },
      ],
      []
    );
    setBranchInfo(modifiedData);
  };

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    // console.log("Data number--->", packageDuration, price);

    if (packageDuration !== "" && price !== "") {
      if (packageDuration === "1 Months") {
        setChoosePrice(Number(price) * 1);
        console.log("New Data number", Number(price) * 1);
      }
      if (packageDuration === "2 Months") {
        setChoosePrice(Number(price) * 2);

        console.log("New Data number", Number(price) * 2);
      }
      if (packageDuration === "3 Months") {
        setChoosePrice(Number(price) * 3);

        console.log("New Data number", Number(price) * 3);
      }
      if (packageDuration === "4 Months") {
        setChoosePrice(Number(price) * 4);

        console.log("New Data number", Number(price) * 4);
      }
      if (packageDuration === "5 Months") {
        setChoosePrice(Number(price) * 5);

        console.log("New Data number", Number(price) * 5);
      }
      if (packageDuration === "6 Months") {
        setChoosePrice(Number(price) * 6);

        console.log("New Data number", Number(price) * 6);
      }
      if (packageDuration === "7 Months") {
        setChoosePrice(Number(price) * 7);

        console.log("New Data number", Number(price) * 7);
      }
      if (packageDuration === "8 Months") {
        setChoosePrice(Number(price) * 8);

        console.log("New Data number", Number(price) * 8);
      }
      if (packageDuration === "9 Months") {
        setChoosePrice(Number(price) * 9);

        console.log("New Data number", Number(price) * 9);
      }
      if (packageDuration === "10 Months") {
        setChoosePrice(Number(price) * 10);

        console.log("New Data number", Number(price) * 10);
      }
      if (packageDuration === "11 Months") {
        setChoosePrice(Number(price) * 11);

        console.log("New Data number", Number(price) * 11);
      }
    }
  }, [price, packageDuration]);
  //  const DEMO =()=>{
  //   console.log("achaa")
  //  }

  const [body, setBody] = useState("");
  const handleBody = (e) => {
    console.log(e);
    setdescription(e);
  };
  const [bodyD, setBodyD] = useState("");
  const handleBodyD = (e) => {
    console.log(e);
    setDeliverables(e);
  };
  const [bodyacademy, setbodyacademy] = useState("");
  const handleBodacademy = (e) => {
    console.log(e);
    setbodyacademy(e);
  };
  const [bodyacademyy, setbodyacademyy] = useState("");
  const handleBodacademyy = (e) => {
    console.log(e);
    setbodyacademyy(e);
  };
  const handleBodefitness = (e) => {
    console.log(e);
    setbodyfitness(e);
  };

  // Multi Select Slot
  const handleSlot = (selectedList, selectedItem) => {
    // alert(selectedList)
    setSlotDuration(selectedList);
  };
  return (
    <form>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Gym Services
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    {...register("title", { required: true })}
                    fullWidth
                    id="firstName"
                    label="Title"
                    autoFocus
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  {errors.title && (
                    <p style={{ color: "red" }}> Title is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <select
                    {...register("category", { required: true })}
                    id="category"
                    className="form-select"
                    value={category}
                    disabled="true"
                    onChange={(e) => {
                      setcategory(e.target.value);
                      // DEMO();
                    }}
                    required
                  >
                    <option value={""} disabled>
                      Choose Category
                    </option>
                    <option value="fitness">Fitness</option>;
                    <option value="wellness">Wellness</option>
                    <option value="academy">Academy</option>
                  </select>
                </Grid>

                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                {category === "fitness" ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <select
                        {...register("branch", { required: true })}
                        id="branch"
                        className="form-select"
                        value={branch}
                        onChange={(e) => {
                          setBranch(e.target.value);
                          setChooseBranch(true);
                        }}
                        required
                      >
                        <option value={""} disabled>
                          Choose branch
                        </option>

                        {branchInfo.length &&
                          branchInfo?.map((x, key) => {
                            return (
                              <option key={key} value={x._id}>
                                {x.branchName}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        Package Details<br></br>
                      </Grid>
                      <Grid item>
                        <label>01 month</label>
                        <input
                          type="text"
                          id="one-month"
                          placeholder="price"
                          value={priceOneMonth}
                          onChange={(e) => setpriceOneMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>02 month</label>
                        <input
                          type="text"
                          id="two-month"
                          placeholder="price"
                          value={priceTwoMonth}
                          onChange={(e) => setpriceTwoMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>03 month</label>
                        <input
                          type="text"
                          id="three-month"
                          placeholder="price"
                          value={priceThreeMonth}
                          onChange={(e) => setpriceThreeMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>06 month</label>
                        <input
                          type="text"
                          id="six-month"
                          placeholder="price"
                          value={priceSixMonth}
                          onChange={(e) => setpriceSixMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>12 month</label>
                        <input
                          type="text"
                          id="tweleve-month"
                          placeholder="price"
                          value={priceTwelveMonth}
                          onChange={(e) => setpriceTwelveMonth(e.target.value)}
                        />
                      </Grid>
                    </Grid>

                    <>
                      <Grid item xs={12} sm={6} mt={-2.5}>
                        {/* Package Details */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <Multiselect
                              onSelect={handleSlot}
                              value={slotDuration}
                              showArrow
                              options={slotArray}
                              isObject={false}
                            />
                          </Stack>

                          <Stack spacing={3}>
                            Manager Details
                            <TextField
                              inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                maxLength: 10,
                                minLength: 10,
                              }}
                              autoComplete="managerNumber"
                              name="managerNumber"
                              {...register("manager_Phone_number", {
                                required: true,
                              })}
                              fullWidth
                              id="managerNumber"
                              label="manager number"
                              autoFocus
                              value={managerNumber}
                              onChange={(e) => setManagerNumber(e.target.value)}
                            />
                            {errors.managerNumber && (
                              <p style={{ color: "red" }}>
                                manager number is required
                              </p>
                            )}
                            <ReactQuill
                              placeholder="Write some thing amazing ..."
                              modules={EditServices.modules}
                              formats={EditServices.formats}
                              onChange={handleBodefitness}
                              value={bodyfitness}
                              style={{ width: "542px" }}
                              id="text-area"
                            />
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                            ></LocalizationProvider>
                          </Stack>
                        </LocalizationProvider>
                      </Grid>
                    </>
                  </>
                ) : category === "academy" ? (
                  ////////////////////////////////////////////////////////////////////////Academy code///////////////////////////////////////////////////////////////
                  <>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        Package Details<br></br>
                      </Grid>
                      <Grid item>
                        <label>01 month </label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceOneMonth}
                          onChange={(e) => setpriceOneMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>02 month </label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceTwoMonth}
                          onChange={(e) => setpriceTwoMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>03 month </label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceThreeMonth}
                          onChange={(e) => setpriceThreeMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>06 month </label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceSixMonth}
                          onChange={(e) => setpriceSixMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>12 month </label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceTwelveMonth}
                          onChange={(e) => setpriceTwelveMonth(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Multiselect
                      onSelect={handleSlot}
                      value={slotDuration}
                      showArrow
                      options={slotArray}
                      isObject={false}
                    />

                    <Grid item xs={12} sm={7}>
                      <Stack spacing={3}>
                        <TextField
                          autoComplete="CoachName"
                          name="coachName"
                          {...register("coachName", { required: true })}
                          fullWidth
                          id="coachName"
                          label="Coach Name"
                          autoFocus
                          value={coachName}
                          onChange={(e) => setcoachName(e.target.value)}
                        />
                        {errors.coachName && (
                          <p style={{ color: "red" }}>coach Name is required</p>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item mt={2} ml={0.2}>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 10,
                          minLength: 10,
                        }}
                        autoComplete="coachNumber"
                        name="coachNumber"
                        {...register("coachNumber", { required: true })}
                        fullWidth
                        id="coachNumber"
                        label="Coach Number"
                        autoFocus
                        value={coachNumber}
                        onChange={(e) => setcoachNumber(e.target.value)}
                      />
                      {errors.coachNumber && (
                        <p style={{ color: "red" }}>coach Number is required</p>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={15}>
                      <h5>Deliveriables</h5>

                      <ReactQuill
                        placeholder="Write some thing amazing ..."
                        modules={EditServices.modules}
                        formats={EditServices.formats}
                        onChange={handleBodacademyy}
                        value={bodyacademyy}
                        style={{ width: "542px" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={15}>
                      <h5>Description</h5>

                      <ReactQuill
                        placeholder="Write some thing amazing ..."
                        modules={EditServices.modules}
                        formats={EditServices.formats}
                        onChange={handleBodacademy}
                        value={bodyacademy}
                        style={{ width: "542px" }}
                      />
                    </Grid>
                  </>
                ) : category === "wellness" ? (
                  ////////////////////////////////////////////////////////////////wellness code///////////////////////////////////////////////////////////////
                  <>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        Package Details<br></br>
                      </Grid>
                      <Grid item>
                        <label>01 month</label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceOneMonth}
                          onChange={(e) => setpriceOneMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>02 month</label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceTwoMonth}
                          onChange={(e) => setpriceTwoMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>03 month</label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceThreeMonth}
                          onChange={(e) => setpriceThreeMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>06 month</label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceSixMonth}
                          onChange={(e) => setpriceSixMonth(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <label>12 month</label>
                        <input
                          type="text"
                          placeholder="price"
                          value={priceTwelveMonth}
                          onChange={(e) => setpriceTwelveMonth(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    {/* TimeSlot */}
                    <Multiselect
                      onSelect={handleSlot}
                      value={slotDuration}
                      showArrow
                      options={slotArray}
                      isObject={false}
                    />
                    <Grid item xs={12} sm={15}>
                      <h4>Deliverables</h4>
                      <ReactQuill
                        placeholder="Write some thing amazing ..."
                        modules={EditServices.modules}
                        formats={EditServices.formats}
                        onChange={handleBodyD}
                        value={Deliverables}
                        style={{ width: "542px" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={15}>
                      <h4>description</h4>

                      <ReactQuill
                        placeholder="Write some thing amazing ..."
                        modules={EditServices.modules}
                        formats={EditServices.formats}
                        onChange={handleBody}
                        value={description}
                        style={{ width: "542px" }}
                      />
                    </Grid>
                  </>
                ) : null}

                <Grid item xs={12} sm={6} mt={3}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      {...register("image", { required: true })}
                      multiple
                      type="file"
                      //  value={image}
                      onChange={(e) => setimage(e.target.files[0])}
                    />
                  </Button>
                  {/* {errors.image && (
                                        <p style={{ color: "red" }}> image is required</p>
                                    )} */}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmit}
                >
                  Update Service
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/services" variant="body2">
                      Back to gym branch servics
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

EditServices.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

EditServices.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default EditServices;
