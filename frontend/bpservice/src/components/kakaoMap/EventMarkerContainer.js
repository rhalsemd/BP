import { memo, useRef, useState } from "react";
import { MapMarker, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mapInfo } from "../../modules/mapStore";
import styled from "../../style/EventMarkerContainer.module.css";
import markerImg from "../../style/umbrella.png";
import homeIntro from "../../style/homeIntro.png";

function EventMarkerContainer({
  position,
  index,
  positions,
  currentMarkerInfo,
  setIsClickMarker,
  mapStore,
}) {
  const markerRef = useRef();

  const [isOpen, setIsOpen] = useState(Array(positions.length).fill(false));
  const map = useMap();
  const navigation = useNavigate();

  const RoadView = () => {
    navigation("/bp/map/RoadView", { state: mapStore.currentInfo.latlng });
  };

  return (
    <>
      <MapMarker
        ref={markerRef}
        className="marker"
        position={position.latlng}
        image={{
          src: markerImg,
          size: {
            width: 64,
            height: 60,
          },
          options: {
            offset: {
              x: 34.6,
              y: 60,
            },
          },
        }}
        onClick={(marker) => {
          setIsClickMarker(true);
          map.panTo(marker.getPosition());
          setIsOpen((isOpen) => {
            isOpen[index] = true;
            return [...isOpen];
          });
          currentMarkerInfo(position);
        }}
      />
      {isOpen[index] && (
        <CustomOverlayMap position={position.latlng}>
          <div className={styled.wrap}>
            <div className={styled.info}>
              <div className={styled.title}>
                {position.title}
                <div
                  className={styled.close}
                  onClick={() => {
                    setIsOpen((isOpen) => {
                      isOpen[index] = false;
                      return [...isOpen];
                    });
                  }}
                  title="닫기"
                ></div>
              </div>
              <div className={styled.body}>
                <div className={styled.img}>
                  <img
                    src={homeIntro}
                    // width="73"
                    // height="40"
                    alt={position.title}
                  />
                </div>
                <div className={styled.desc}>
                  <div>
                    <p>
                      남은 우산 수 :{" "}
                      <span style={{ fontWeight: "400" }}>
                        {position.brollyCount}
                      </span>
                    </p>
                    <p>
                      전체 우산 수 :{" "}
                      <span style={{ fontWeight: "400" }}>
                        {position.brollyTotalCount}
                      </span>
                    </p>
                  </div>

                  <div>
                    <button className={styled.RoadView} onClick={RoadView}>
                      로드뷰
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ;
        </CustomOverlayMap>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentMarkerInfo(info) {
      dispatch(mapInfo.currentMarkerInfo(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(EventMarkerContainer));
