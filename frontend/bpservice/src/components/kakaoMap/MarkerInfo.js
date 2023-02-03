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

  const loadView = () => {
    navigation("/bp/loadview", { state: mapStore.currentInfo.latlng });
  };

  return (
    <>
      {isClickMarker ? (
        <div className={styled.outerBox}>
          <div className={styled.infoBox}>
            <div className={styled.content}>
              <h2>위치</h2>
              <h4>{title}</h4>
            </div>

            <div className={styled.content}>
              <h2>우산</h2>
              <h4>{`${brollyCount} / ${brollyTotalCount}`} </h4>
            </div>
            <button className={styled.loadView} onClick={loadView}>
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
