import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isInteger } from "formik";
import { actionCreators, svg } from "../../../Paths";
import { Spin } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

const ReportRevenue = ({ close }) => {
  const [state, setState] = React.useState({
    month_revenue: "",
    month_expense: "",
    date: "",
    month: "",
  });
  const [message, setMessage] = React.useState("");
  const [error1, setError1] = React.useState("");
  const [error2, setError2] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  const { loader } = useSelector((state) => state.admin);
  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const addRevenue = () => {
    if (!isInteger(state.month_revenue) || !isInteger(state.month_expense))
      return setMessage("All fields are required");
    if (moment(state.date).format("MMM") !== state.month.substring(0, 3))
      return setMessage(
        "Month selected should match with the month in the selected date"
      );
    if (
      state.month_revenue === "" ||
      state.month_expense === "" ||
      state.date === "" ||
      state.month === ""
    )
      return setMessage("All fields are reequired");
    dispatch(
      actionCreators.addRevenue(
        username,
        parseInt(state.month_revenue.replace(/,/g, "")),
        parseInt(state.month_expense.replace(/,/g, "")),
        state.date,
        state.month,
        (res) => {
          if (res.success) setMessage(res.message);
        }
      )
    );
    setState({
      month_expense: "",
      month_revenue: "",
      date: "",
      month: "",
    });
    setMessage("");
  };

  return (
    <div className="report-modal-container">
      <div className="report-container-content">
        {message ? <p style={{ color: "#37561b" }}>{message}</p> : null}
        <div className="label">
          <h1>Monthly Reporting {username}</h1>
          <h4>
            Needs to be done every month. You have 2 weeks for the reporting
            after a month has passed. For example, January revenues must be
            reported latest by 14th of Feb. If you fail to report for one month,
            you will not be able to request a loan in the next 6 months from
            StartHub. We will also not list you for any investment matchmaking
            for 9 months as we do not have enough data.
          </h4>
        </div>
        <div className="account-details-container">
          <h1>SHA Account Details</h1>
          <div className="account-details-container-row">
            <div className="account-details-label-row">
              <h3>Name:</h3> <h4>SHA CONSULTING GROUP LTD</h4>
            </div>
            <div className="account-details-label-row">
              <h3>Acc Number:</h3>
              <h4>01073659204812</h4>
            </div>
            <div className="account-details-label-row">
              <h3>BIC/SWIFT:</h3>
              <h4>DFCUUGKA</h4>
            </div>
            <div className="account-details-label-row">
              <h3>BIC/SWIFT:</h3>
              <h4>DFCUUGKA</h4>
            </div>
            <div className="account-details-label-row">
              <h3>BRANCH:</h3>
              <h4>JINJA ROAD BRANCH</h4>
            </div>
            <div
              className="account-details-label-row"
              style={{ visibility: "hidden" }}
            >
              <h3>BRANCH:</h3>
              <h4>JINJA ROAD BRANCH</h4>
            </div>
          </div>
        </div>
        <div className="text-input-row">
          <div className="textInputColumn">
            <div className="label">
              <p>
                Monthly Revenue(UGX)<strong style={{ color: "red" }}> *</strong>
              </p>
              <h5>
                All revenues from 1st day of month to last day of the month.
              </h5>
            </div>
            <input
              value={state.month_revenue}
              required="required"
              onChange={(e) => {
                if (!isInteger(state.month_revenue))
                  setError1('Enter amount or "0" if no revenue generated');
                if (isInteger(state.month_revenue)) setError1("");
                setState({ ...state, month_revenue: e.target.value });
              }}
            />
            {error1 ? (
              <p style={{ color: "rgba(0,0,0,0.4)" }}>{error1}</p>
            ) : null}
            <div className="label">
              <p>
                Monthly Expenses(UGX)
                <strong style={{ color: "red" }}> *</strong>
              </p>
              <h5>
                All expenses from 1st day of month to last day of the month.{" "}
              </h5>
            </div>
            <input
              value={state.month_expense}
              required="required"
              onChange={(e) => {
                if (!isInteger(state.month_expense))
                  setError2('Enter amount or "0" if no expenses incurred');
                if (isInteger(state.month_expense)) setError2("");
                setState({ ...state, month_expense: e.target.value });
              }}
            />
            {error2 ? (
              <p style={{ color: "rgba(0,0,0,0.4)" }}>{error2}</p>
            ) : null}
          </div>
          <div className="textInputColumn">
            <div className="label">
              <p>
                Date<strong style={{ color: "red" }}> *</strong>
              </p>
              <h5>
                Put ANY day in the month you are reporting for. Even if you
                report only in July but for the month of June, select any date
                in June.
              </h5>
            </div>
            <input
              type="date"
              required="required"
              value={state.date}
              onChange={(e) => {
                setState({ ...state, date: e.target.value });
              }}
            />
            <div className="label">
              <p>
                Month<strong style={{ color: "red" }}> *</strong>
              </p>
              <h5>Put the month that you are submitting revenue for</h5>
            </div>
            <select
              required="required"
              value={state.month}
              onChange={(e) => {
                setState({ ...state, month: e.target.value });
              }}
            >
              <option value="" disabled selected>
                -select-
              </option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          </div>
        </div>
        <div className="report-btn-row">
          <button
            style={{
              background: disable ? "#eee" : "#37561b",
              marginTop: "1rem",
              color: "#fff",
            }}
            disabled={loader ? true : false}
            onClick={addRevenue}
          >
            {loader ? (
              <img src={svg} style={{ height: "30px", width: "30px" }} />
            ) : (
              "Submit"
            )}
          </button>
          <button
            style={{
              background: disable ? "#eee" : "#37561b",
              marginTop: "1rem",
              color: "#fff",
            }}
            disabled={loader ? true : false}
            onClick={close}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportRevenue;
