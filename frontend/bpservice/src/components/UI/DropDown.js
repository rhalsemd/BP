import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import {
  getRevenueTrend,
  getRevenueTrendMonth,
} from "../../modules/revenueTrend";
import { useLocation } from "react-router-dom";

export default function BarChart() {
  const [term, setTerm] = React.useState("");

  const date = useSelector((state) => state.histogramReducer.selectDate);

  const dispatch = useDispatch();
  const { state } = useLocation();

  const caseId = state.caseId;

  const handleChange = (event) => {
    setTerm(event.target.value);

    const year = dayjs(date).format("YYYY");

    if (event.target.value == "day") {
      const month = dayjs(date).format("MM");
      dispatch(getRevenueTrend({ month, year, caseId }));
    } else {
      dispatch(getRevenueTrendMonth({ year, caseId }));
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">선택</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={term}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="day">DAY</MenuItem>
        <MenuItem value="month">MONTH</MenuItem>
      </Select>
    </FormControl>
  );
}
