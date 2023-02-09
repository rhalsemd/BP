import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCost } from "../../modules/payment";

import styled from "../../style/Receipt.module.css";

function BeforePayment() {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { depositeMoney, money } = useSelector(
    ({ paymentReducer }) => paymentReducer.price
  );

  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("kioskId");

  const onClick = () => {
    navigation("/bp/payment", { state: { kioskId: term } });
  };

  const objString = localStorage.getItem("login-token");

  useEffect(() => {
    if (!objString) {
      navigation("/bp/login", {
        state: { beforePayment: true, kioskId: term },
      });
    } else {
      dispatch(getCost());
    }
  }, [objString, navigation, dispatch]);

  return (
    <div>
      <div className={styled.container}>
        <div className={styled.tab}></div>

        <div className={styled.receipt}>
          <div className={styled.paper}>
            {/* <div className={styled.title}>Receipt</div> */}
            <div className={styled.date}>날짜: 2023/02/04</div>
            <table>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bolder",
                      color: "green",
                    }}
                  >
                    항목
                  </td>
                  <td
                    className={styled.right}
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bolder",
                      color: "green",
                    }}
                  >
                    금액
                  </td>
                </tr>

                <tr>
                  <td>보증금</td>
                  <td className={styled.right}>{depositeMoney}원</td>
                </tr>
                <tr>
                  <td>시간 당 금액</td>
                  <td className={styled.right}>{money}원</td>
                </tr>

                <tr>
                  <td colSpan="2" className={styled.center}>
                    <input type="button" value="결제하기" onClick={onClick} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={(styled.sign, styled.center)}>
              <div className={styled.barcode}></div>
              <br />
              {term}
              <br />
              <div className={styled.thankyou}>이용해주셔서 감사합니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforePayment;
