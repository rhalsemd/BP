import { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBranchRevenue } from "../../modules/histogram";
import { getUseage } from "../../modules/TotalUseage";
import { changeDay } from "../../modules/changeDate";
import { useDispatch, useSelector } from "react-redux";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2034-01-01T00:00:00.000");

const SubComponentsPickers = ({ setMonthOn, getBranchRevenue, getUseage }) => {
  const dispatch = useDispatch();
  const url = useLocation().pathname === "/admin/total-income";
  const date = useSelector((state) => state.chagneDateReducer.day);

  const changeMonth = (newDate) => {
    dispatch(changeDay(newDate));
    if (url) {
      getBranchRevenue(newDate);
    } else {
      getUseage(newDate);
    }
    setMonthOn(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12} md={6}>
        <CalendarPicker
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newDate) => changeMonth(newDate)}
          view={"day"}
        />
      </Grid>
    </LocalizationProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getBranchRevenue: (data) => {
    dispatch(getBranchRevenue(data));
  },
  getUseage: (data) => {
    dispatch(getUseage(data));
  },
});

export default connect(null, mapDispatchToProps)(SubComponentsPickers);
