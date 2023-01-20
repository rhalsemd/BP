// /** @jsxImportSource @emotion/react */
// import { jsx, css } from "@emotion/react";
// import { useState } from "react";

// import { connect } from "react-redux";
// import { mapInfo } from "../../modules/mapStore";

// const SearchBarSizeContainer = css`
//   box-sizing: border-box;
// `;

// const SearchBarSize = css`
//   width: 100vw;
//   height: 10vh;
//   padding: 0;
//   font-size: 2rem;
//   border: none;
// `;

// function MapSearch({ mapStore, searchValue }) {
//   const [searchInputValue, setSearchInputValue] = useState("");

//   const getInputValue = (e) => {
//     const INPUT_VALUE = e.target.value;
//     setSearchInputValue(INPUT_VALUE);
//     searchValue(INPUT_VALUE);
//   };

//   return (
//     <div css={SearchBarSizeContainer}>
//       <input
//         css={SearchBarSize}
//         onChange={getInputValue}
//         value={searchInputValue}
//       />
//     </div>
//   );
// }

// const mapStateToProps = ({ mapStore }, ownProps) => {
//   return { mapStore };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     searchValue(input) {
//       dispatch(mapInfo.searchValue(input));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MapSearch);
