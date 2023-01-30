function ConfirmCondition({ info }) {
  return (
    <>
      {info.next !== info.confirmPwd && info.confirmPwd ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </>
  );
}

export default ConfirmCondition;
