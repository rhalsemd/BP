function NextPwdCondition({ pwdRegExp, info }) {
  return (
    <>
      {(pwdRegExp.test(info.next) && info.next !== info.current) ||
      info.next.length === 0 ? null : info.next === info.current ? (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>현재 비밀번호와 같습니다.</span>
        </div>
      ) : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>8~20로 비밀번호를 설정해주세요</span>
        </div>
      )}
    </>
  );
}

export default NextPwdCondition;
