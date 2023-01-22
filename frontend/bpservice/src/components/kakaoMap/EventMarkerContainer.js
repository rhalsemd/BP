import { memo, useState } from "react";
import { MapMarker, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import styled from "../../style/EventMarkerContainer.module.css";
import markerImg from "../../style/umbrella.png";

function EventMarkerContainer({ position, index, positions }) {
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
          map.panTo(marker.getPosition());
          setIsOpen((position) => {
            position[index] = true;
            return [...position];
          });
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
                    setIsOpen((position) => {
                      position[index] = false;
                      return [...position];
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
                    alt="카카오 스페이스닷원"
                  />
                </div>
                <div className={styled.desc}>
                  <div className={styled.ellipsis}>
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

export default memo(EventMarkerContainer);
