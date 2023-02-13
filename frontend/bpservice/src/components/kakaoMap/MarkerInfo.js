import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "../../style/MarkerInfo.module.css";

function MarkerInfo({ mapStore, isClickMarker }) {
  const navigation = useNavigate();

  const title = mapStore.currentInfo ? mapStore.currentInfo.title : "";
  const brollyCount = mapStore.currentInfo
    ? mapStore.currentInfo.brollyCount
    : "";
  const brollyTotalCount = mapStore.currentInfo
    ? mapStore.currentInfo.brollyTotalCount
    : "";

  const RoadView = () => {
    navigation("/bp/map/RoadView", { state: mapStore.currentInfo.latlng });
  };

  return (
    <>
      {isClickMarker ? (
        <div className={styled.outerBox}>
          <div className={styled.infoBox}>
            <div className={styled.content}>
              <p style={{ fontSize: "1.4rem", fontWeight: "800" }}>위치</p>
              <p>{title}</p>
            </div>

            <div className={styled.content}>
              <p style={{ fontSize: "1.4rem", fontWeight: "800" }}>우산</p>
              <p>{`${brollyCount} / ${brollyTotalCount}`} </p>
            </div>
            <button className={styled.RoadView} onClick={RoadView}>
              로드뷰
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

export default connect(mapStateToProps)(MarkerInfo);
