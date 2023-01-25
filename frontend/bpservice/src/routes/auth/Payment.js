import { Bootpay } from "@bootpay/client-js";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

export default function Payment() {
  const response = Bootpay.requestPayment({
    application_id: "63d0816b3049c8001a5dc07b",
    price: 1000,
    order_name: "테스트결제",
    order_id: "TEST_ORDER_ID",
    pg: "kcp",
    method: "카드",
    tax_free: 0,
    user: {
      id: "회원아이디",
      username: "회원이름",
      phone: "01000000000",
      email: "test@test.com",
    },
    items: [
      {
        id: "item_id",
        name: "테스트아이템",
        qty: 1,
        price: 1000,
      },
    ],
    extra: {
      open_type: "iframe",
      card_quota: "0,2,3",
      escrow: false,
    },
  });

  return <>{/* <button onClick={() => response}>button</button> */}</>;
}
