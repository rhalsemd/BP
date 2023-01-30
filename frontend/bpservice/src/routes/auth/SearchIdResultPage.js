/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

const resultArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const resultModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const resultModal = css`
  width: 35vh;
  height: 35vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function SearchIdResultPage() {
  const { id } = useSelector(({ findIdReducer }) => findIdReducer);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={resultArea}>
        <div css={resultModalPosition}>
          <div css={resultModal}>
            <div css={title}>
              <h2>{id}</h2>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SearchIdResultPage;
