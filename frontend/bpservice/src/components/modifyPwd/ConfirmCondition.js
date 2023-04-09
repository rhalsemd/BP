import Alert from "@mui/material/Alert";

function ConfirmCondition({ info }) {
  return (
    <>
      {info.next !== info.confirmPwd && info.confirmPwd ? (
        <Alert
          sx={{
            hieght: "10%",
            fontSize: "12px",
            paddingTop: "0",
            paddingBottom: "0",
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          severity="error"
        >
          비밀번호를 확인해주세요.
        </Alert>
      ) : info.confirmPwd.length === 0 ? null : (
        <Alert
          sx={{
            hieght: "10%",
            fontSize: "12px",
            paddingTop: "0",
            paddingBottom: "0",
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          severity="success"
        >
          비밀번호가 일치합니다.
        </Alert>
      )}
    </>
  );
}

export default ConfirmCondition;
