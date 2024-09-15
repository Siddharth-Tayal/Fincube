import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function SplitScreen({ isAuthenticated }) {
  const navigate = useNavigate();
  const fincubeToken = localStorage.getItem("fincubeToken");
  const parsedToken = JSON.parse(fincubeToken);
  const token = parsedToken?.value;
  React.useEffect(() => {
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    amount: 0,
    oldbalanceOrg: 0,
    newbalanceOrg: 0,
    oldbalanceDest: 0,
    newbalanceDest: 0,
    hour: 0,
    type: "",
    transactions_per_account: 0,
    transactions_per_hour: 0,
    avg_transaction_amount: 0,
    is_new_account: "",
    transactions_per_destination: 0,
    change_in_transaction_pattern: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className=" h-fit md:h-screen overflow-hidden flex flex-col md:flex-row w-screen ">
      <div className=" h-fit  md:h-screen flex items-center justify-center w-screen md:w-[50vw] ">
        <div className=" w-full px-3 pt-[80px] pb-5 md:pt-[80px]">
          <Typography variant="h4" component="h2">
            Fraud Check{" "}
          </Typography>
          <form
            fullWidth
            onSubmit={handleSubmit}
            className=" flex flex-col items-center justify-center gap-2 w-full"
          >
            <div className=" flex gap-2 w-full">
              <TextField
                fullWidth
                label="Amount"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
              />
            </div>{" "}
            <div className=" flex gap-2 w-full">
              <TextField
                fullWidth
                label="Old Balance Origin"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oldbalanceOrg: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                label="New Balance Origin"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newbalanceOrg: Number(e.target.value),
                  })
                }
              />
            </div>{" "}
            <div className=" flex gap-2 w-full">
              {" "}
              <TextField
                fullWidth
                label="Old Balance Destination"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oldbalanceDest: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                label="New Balance Destination"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newbalanceDest: Number(e.target.value),
                  })
                }
              />
            </div>{" "}
            <div className=" flex gap-2 w-full">
              <TextField
                fullWidth
                label="Transactions per Account"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactions_per_account: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                label="Transaction per Hour"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactions_per_hour: Number(e.target.value),
                  })
                }
              />
            </div>{" "}
            <div className=" flex gap-2 w-full">
              <TextField
                fullWidth
                label="Average Transaction Amount"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    avg_transaction_amount: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="Transaction per Destination"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactions_per_destination: Number(e.target.value),
                  })
                }
              />
            </div>{" "}
            <div className=" flex gap-2 w-full">
              <TextField
                fullWidth
                label="Change in Transaction Pattern"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    change_in_transaction_pattern: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="Last transaction Hours"
                onChange={(e) =>
                  setFormData({ ...formData, hour: Number(e.target.value) })
                }
              />
            </div>{" "}
            <Typography
              textAlign={"start"}
              width={"100%"}
              variant="body2"
              p={"10px"}
              pb={"0px"}
              component={"h6"}
            >
              Is New Account
            </Typography>
            <Select
              className=""
              fullWidth
              value={formData?.newAccount}
              onChange={(e) =>
                setFormData({ ...formData, is_new_account: e.target.value })
              }
              label="Select a value"
            >
              <MenuItem value={1}>True</MenuItem>
              <MenuItem value={0}>False</MenuItem>
            </Select>{" "}
            <Typography
              textAlign={"start"}
              width={"100%"}
              variant="body2"
              p={"10px"}
              pb={"0px"}
              component={"h6"}
            >
              Transaction Type
            </Typography>
            <Select
              className=""
              fullWidth
              value={formData?.newAccount}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              label="Select a value"
            >
              <MenuItem value={"CASH-IN"}>CASH-IN</MenuItem>
              <MenuItem value={"CASH-OUT"}>CASH-OUT</MenuItem>
              <MenuItem value={"DEBIT"}>DEBIT</MenuItem>
              <MenuItem value={"PAYMENT"}>PAYMENT</MenuItem>
              <MenuItem value={"TRANSFER"}>TRANSFER</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <img
        className=" w-screen h-[50vh] md:h-[100%] md:w-[50vw]"
        alt={"Login Image"}
        src={
          "https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
}
