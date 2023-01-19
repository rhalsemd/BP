/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback, useState } from "react";
import { connect } from "react-redux";

const resultBox = css`
  width: 100vw;
  height: 30vh;
  background-color: white;
  overflow: scroll;
`;

const resultContent = css`
  font-size: 2rem;
  cursor: pointer;
`;

function MapSearchResult({ mapStore }) {
  const [placeId, setPlaceId] = useState("");
  // 장소를 클릭했을 때
  const goToPlace = (e) => {
    console.log(e.target.id);
    setPlaceId(e.target.id);
  };

  return (
    <div css={resultBox}>
      <span>
        <ul>
          {mapStore.searchResult
            ? mapStore.searchResult.map((item) => {
                return (
                  <li
                    key={item.id}
                    css={resultContent}
                    onClick={goToPlace}
                    id={item.id}
                  >
                    {item.place_name}
                  </li>
                );
              })
            : null}
        </ul>
      </span>
    </div>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

export default connect(mapStateToProps)(MapSearchResult);
