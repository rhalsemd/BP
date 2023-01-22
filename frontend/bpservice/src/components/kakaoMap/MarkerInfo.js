import { connect } from "react-redux";
import styled from "../../style/MarkerInfo.module.css";

function MarkerInfo({ mapStore }) {
  const title = mapStore.currentInfo
    ? mapStore.currentInfo.title
    : "마커를 클릭해주세요";
  return (
    <>
      <div className={styled.outerBox}>
        <div className={styled.infoBox}>
          <h1>{title}</h1>
          <img src="" alt={`${title} 이미지`} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

export default connect(mapStateToProps)(MarkerInfo);
