function ConfirmCondition({ next, confirmPwd }) {
  return (
    <>
      {next !== confirmPwd && confirmPwd ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </>
  );
}

export default ConfirmCondition;
