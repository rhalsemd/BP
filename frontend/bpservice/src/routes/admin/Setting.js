/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Nav from "../../components/NavAdmin";
import Footer from "../../components/Footer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllKiosk,
  getKioskOpen,
  getKioskClose,
} from "../../modules/setting";
import { useState } from "react";

const container = css`
  height: 74vh;
  display: flex;
  flex-direction: column;
`;

export default function Setting() {
  const [age, setAge] = useState("");
  const kiosks = useSelector((state) => state.getAllKioskReducer.kiosks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllKiosk());
  }, []);
  let kioskList;
  useEffect(() => {
    if (!kiosks) return;
  }, [kiosks]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {});
  return (
    <>
      <Nav />
      <div css={container}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">지점 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="지점 선택"
              onChange={handleChange}
            >
              {kiosks
                ? kiosks.map((d, i) => {
                    return (
                      <MenuItem value={d.id} key={d.id}>
                        {d.name}
                      </MenuItem>
                    );
                  })
                : "로딩중"}
            </Select>
          </FormControl>
        </Box>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => dispatch(getKioskClose(age))}
          >
            키오스크 닫기
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(getKioskOpen(age))}
          >
            키오스크 열기
          </Button>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
