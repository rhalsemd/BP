import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { connect } from "react-redux";
import { getBranchRevenue } from "../../modules/histogram";
import { useLocation } from "react-router-dom";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2034-01-01T00:00:00.000");

const SubComponentsPickers = ({ histogram, getBranchRevenue }) => {
  const url = useLocation().pathname === "/admin/total_income";
  const [date, setDate] = useState(dayjs("2023-01-25"));
  const changeDay = (newDate) => {
    setDate(newDate);
    if (url) {
      getBranchRevenue();
      const year = dayjs(date).format("YYYY");
      const month = dayjs(date).format("MM");
      console.log(year, month);
    } else {
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12} md={6}>
        <MonthPicker
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newDate) => changeDay(newDate)}
        />
      </Grid>
    </LocalizationProvider>
  );
};

const mapStateToProps = ({ histogram }) => {
  return { histogram };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchRevenue(data) {
      dispatch(getBranchRevenue(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComponentsPickers);
