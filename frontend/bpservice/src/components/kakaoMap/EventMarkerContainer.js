import { memo, useState } from "react";
import { MapMarker, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { connect } from "react-redux";
import { mapInfo } from "../../modules/mapStore";
import styled from "../../style/EventMarkerContainer.module.css";
import markerImg from "../../style/umbrella.png";

function EventMarkerContainer({
  position,
  index,
  positions,
  currentMarkerInfo,
  setIsClickMarker,
}) {
  const [isOpen, setIsOpen] = useState(Array(positions.length).fill(false));
  const map = useMap();

  return (
    <>
      <MapMarker
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
                    src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                    width="73"
                    height="70"
                    alt={position.title}
                  />
                </div>
                <div className={styled.desc}>
                  {/* <div className={styled.ellipsis}>
                    제주특별자치도 제주시 첨단로 242
                  </div>
                  <div className={(styled.jibun, styled.ellipsis)}>
                    (우) 63309 (지번) 영평동 2181
                  </div>
                  <div>
                    <a
                      href="https://www.kakaocorp.com/main"
                      target="_blank"
                      className={styled.link}
                      rel="noreferrer"
                    >
                      홈페이지
                    </a>
                  </div> */}
                  <h2>남은 우산 수 : {position.brollyCount}</h2>
                  <h2>전체 우산 수 : {position.brollyTotalCount}</h2>
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
