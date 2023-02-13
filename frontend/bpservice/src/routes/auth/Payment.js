import { Bootpay } from "@bootpay/client-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBootpay } from "../../modules/payment";

export default function Payment() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();

  const startPay = async (dispatch, location) => {
    try {
      const response = await Bootpay.requestPayment({
        application_id: "63d0816b3049c8001a5dc07b",
        price: location.state.depositeMoney,
        // price: "100",
        order_name: "비피우산대여",
        order_id: "TEST_ORDER_ID",
        pg: "kcp",
        method: "카드",
        tax_free: 0,
        user: {
          id: "",
          username: "",
          phone: "",
          email: "",
        },
        items: [
          {
            id: "item_id",
            name: "비피우산",
            qty: 1,
            price: location.state.depositeMoney,
            // price: 100,
          },
        ],
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false,
        },
      });

      switch (response.event) {
        case "issued":
          // 가상계좌 입금 완료 처리
          break;
        case "done":
          console.log(response);
          dispatch(
            getBootpay({ DATA: response.data, kioskId: location.state.kioskId })
          );
          navigation("/bp/after/payment", {
            state: { kioskId: location.state.kioskId },
          });
          break;
        case "confirm": //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
          console.log(response.receipt_id);
          /**
           * 1. 클라이언트 승인을 하고자 할때
           * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
           */
          const confirmedData = await Bootpay.confirm(); //결제를 승인한다
          if (confirmedData.event === "done") {
            //결제 성공
          } else if (confirmedData.event === "error") {
            //결제 승인 실패
          }

          /**
           * 2. 서버 승인을 하고자 할때
           * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
           * Bootpay.destroy(); //결제창을 닫는다.
           */
          break;
      }
    } catch (e) {
      // 결제 진행중 오류 발생
      // e.error_code - 부트페이 오류 코드
      // e.pg_error_code - PG 오류 코드
      // e.message - 오류 내용
      console.log(e.message);
      switch (e.event) {
        case "cancel":
          // 사용자가 결제창을 닫을때 호출
          console.log(e.message);
          break;
        case "error":
          // 결제 승인 중 오류 발생시 호출
          console.log(e.error_code);
          break;
      }
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigation("/bp");
    } else {
      startPay(dispatch, location);
    }
  }, [navigation, dispatch, location, startPay]);

  return <></>;
}
