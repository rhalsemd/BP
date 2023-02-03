import Alert from "@mui/material/Alert";

function NextPwdCondition({ pwdRegExp, info }) {
  return (
    <>
      {(pwdRegExp.test(info.next) && info.next !== info.current) ||
      info.next.length === 0 ? (
        info.next.length === 0 ? null : (
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
            유효한 비밀번호입니다.
          </Alert>
        )
      ) : info.next === info.current ? (
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
          현재 비밀번호와 일치합니다.
        </Alert>
      ) : (
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
          형식을 맞춰주세요.
        </Alert>
      )}
    </>
  );
}

export default NextPwdCondition;
