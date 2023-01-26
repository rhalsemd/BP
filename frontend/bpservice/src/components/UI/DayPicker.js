import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBranchRevenue } from "../../modules/histogram";
import { getUseage } from "../../modules/TotalUseage";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2034-01-01T00:00:00.000");

const SubComponentsPickers = ({ getBranchRevenue, getUseage }) => {
  const [date, setDate] = useState(dayjs("2023-01-26"));
  const url = useLocation().pathname === "/admin/total_income";
  const dayData = dayjs(date).format("YYYY-MM-DD");

  const changeMonth = (newDate) => {
    setDate(newDate);
    if (url) {
      getBranchRevenue(dayData);
    } else {
      getUseage(dayData);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12} md={6}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => changeMonth(newDate)}
        />
      </Grid>
    </LocalizationProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchRevenue(data) {
      dispatch(getBranchRevenue(data));
    },
    getUseage(data) {
      dispatch(getUseage(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(SubComponentsPickers);
