import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { connect } from "react-redux";
import { getBranchRevenueMonth } from "../../modules/histogram";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeMonth } from "../../modules/changeDate";
import { getUseageMonth } from "../../modules/TotalUseage";
const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2034-01-01T00:00:00.000");

const SubComponentsPickers = ({ getBranchRevenueMonth, setWeekOn }) => {
  const dispatch = useDispatch();
  const url = useLocation().pathname === "/admin/total-income";
  const date = useSelector((state) => state.chagneDateReducer?.month);

  const changeDay = (newDate) => {
    dispatch(changeMonth(newDate));
    if (url) {
      getBranchRevenueMonth(newDate);
    } else {
      dispatch(getUseageMonth(newDate));
    }
    setWeekOn(false);
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
    getBranchRevenueMonth(data) {
      dispatch(getBranchRevenueMonth(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComponentsPickers);
