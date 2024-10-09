import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingHeaderButton from "./BookingHeaderButton";
import TheaterSeating from "./TheaterSeating";

import { IoMdRefresh } from "react-icons/io";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedMovie,
    selectedTheater,
    selectedDate,
    selectedTime,
    selectedHall,
  } = location.state;

  const getWeekday = (date) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[date.getDay()];
  };

  const [counts, setCounts] = useState({
    adult: 0,
    youth: 0,
    senior: 0,
    child: 0,
  });

  const totalPeople = Object.values(counts).reduce((acc, val) => acc + val, 0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPayment, setIsPayment] = useState(false);

  const handleCountChange = (type, count) => {
    const newCounts = { ...counts, [type]: count };
    const newTotal = Object.values(newCounts).reduce(
      (acc, val) => acc + val,
      0
    );
    if (newTotal <= 8) {
      setCounts(newCounts);
      // 선택된 좌석 초기화 (인원 수 변경 시)
      setSelectedSeats([]);
    }
  };

  const renderCountSelector = (type, title, max = 8) => {
    return (
      <div className="group flex items-center mb-2" id={`nop_group_${type}`}>
        <span className="title w-14 text-xs text-[#666666]">{title}</span>
        <ul className="flex flex-wrap gap-1 mt-1">
          {[...Array(max + 1)].map((_, i) => (
            <li
              key={i}
              data-count={i}
              className={`cursor-pointer ${
                counts[type] === i
                  ? "bg-[#333333] text-white"
                  : "bg-[#F2F0E5] border border-[#D6D3CE]"
              } w-[22px] h-[22px] flex items-center justify-center text-sm font-bold`}
              onClick={() => handleCountChange(type, i)}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // 종료 시간 계산 함수
  const calculateEndTime = (startTime) => {
    if (!startTime) return "";
    const [hour, minute] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hour);
    startDate.setMinutes(minute);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    // 125분 추가
    startDate.setMinutes(startDate.getMinutes() + 125);

    const endHour = startDate.getHours().toString().padStart(2, "0");
    const endMinute = startDate.getMinutes().toString().padStart(2, "0");

    return `${endHour}:${endMinute}`;
  };

  // 종료 시간
  const endTime = selectedTime ? calculateEndTime(selectedTime) : "";

  // 카테고리 라벨 매핑
  const countLabels = {
    adult: "일반",
    youth: "청소년",
    senior: "경로",
    child: "우대",
  };

  // 카테고리별 선택된 인원 수 및 가격 계산
  const priceMapping = {
    adult: 14000,
    youth: 11000,
    senior: 7000,
    child: 5000,
  };

  const categoryTotals = Object.entries(counts)
    .filter(([type, count]) => count > 0)
    .map(([type, count]) => ({
      type: countLabels[type],
      count,
      price: priceMapping[type], // 단가 추가
      total: count * priceMapping[type],
    }));

  const totalAmount = categoryTotals.reduce((acc, { total }) => acc + total, 0);

  // 카테고리별 선택된 인원 수 표시
  const countsDisplay = categoryTotals
    .map(({ type, count }) => `${type} ${count}명`)
    .join(", ");

  useEffect(() => {
    if (
      selectedMovie &&
      selectedDate &&
      selectedTheater &&
      selectedTime &&
      selectedSeats.length > 0
    ) {
      setIsPayment(true);
    } else {
      setIsPayment(false);
    }
  }, [
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedTime,
    selectedSeats,
  ]);

  const handleNavigatePayment = () => {
    if (isPayment) {
      navigate("/ticket/payment", {
        state: {
          selectedMovie: {
            ...selectedMovie,
            posterUrl: `${IMG_BASE_URL}${selectedMovie.poster_path}`,
          },
          selectedTheater,
          selectedDate,
          selectedTime,
          selectedHall,
          selectedSeats,
          counts,
          totalAmount,
        },
      });
    }
  };

  return (
    <>
      <div className="w-[1316px] mx-auto mt-8 select-none flex">
        <div className="w-[160px] h-[300px] mr-1 mt-11">
          <img
            src="https://adimg.cgv.co.kr/images/202302/house/CGV_BUGS_160x300.png"
            alt="Left Ad"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[996px]">
          <BookingHeaderButton />

          <div className="h-[600px] border-t-[3px] border-x-[3px] border-[#D4D3C9] bg-[#F2F0E5]">
            <>
              <div className="w-full h-9 bg-[#333333] text-base text-white font-bold flex justify-center items-center flex-shrink-0 relative">
                <span>인원 / 좌석</span>
                <span
                  className="absolute right-4 flex items-center text-sm font-normal cursor-pointer"
                  onClick={() => {
                    setCounts({ adult: 0, youth: 0, senior: 0, child: 0 });
                    setSelectedSeats([]);
                  }}
                >
                  다시하기
                  <IoMdRefresh size={24} />
                </span>
              </div>

              <div className="border-b-2 border-[#D4D3C9] flex">
                <div className="w-[46%] border-r border-[#D4D3C9] mt-4 px-4 text-xs">
                  <p className="text-[#FF0000] text-right">
                    * 최대 8명 선택 가능
                  </p>

                  {renderCountSelector("adult", "일반")}
                  {renderCountSelector("youth", "청소년")}
                  {renderCountSelector("senior", "경로")}

                  <div className="flex items-center justify-between mb-1.5">
                    {renderCountSelector("child", "우대")}
                    <button className="text-xs py-[1px] px-1.5 rounded text-white bg-[#926F60] border border-[#745447]">
                      관람 할인 안내
                    </button>
                  </div>
                </div>

                <div className="w-[54%] mt-4 px-5 relative">
                  <div className="flex items-center text-xs">
                    <div>CGV {selectedTheater}</div>
                    <div className="mx-3 h-4 w-px bg-gray-300"></div>
                    <div>{selectedHall}</div>
                    <div className="mx-3 h-4 w-px bg-gray-300"></div>
                    <div>
                      남은좌석{" "}
                      <span className="text-[#CA4D10] font-bold">122</span>
                      /123
                    </div>
                  </div>

                  <div className="helvetica mt-1.5 font-bold text-[22.8px] text-[#5A5A5A]">
                    {selectedDate && selectedTime
                      ? `${selectedDate} (${getWeekday(new Date(selectedDate))}) ${selectedTime} ~ ${endTime}`
                      : "날짜와 시간을 선택해주세요"}
                  </div>

                  <button className="absolute bottom-4 right-5 text-xs py-[1px] px-1.5 rounded text-white bg-[#926F60] border border-[#745447]">
                    상영시간 변경하기
                  </button>
                </div>
              </div>

              <div className="pt-5 flex">
                <div className="w-[85%] flex flex-col items-center pl-5">
                  <TheaterSeating
                    totalPeople={totalPeople}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    bookedSeats={["A1", "B2", "C3", "D4", "E5"]}
                  />
                </div>

                <div className="w-[15%] text-[#333333]/[.8]">
                  <button className="helvetica w-[96px] h-[35px] text-[#333333] font-bold text-[13px] rounded border-2 border-[#333333] flex items-center justify-center">
                    <HiMagnifyingGlassPlus size={22} className="mr-0.5" />
                    크게보기
                  </button>

                  <div className="text-xs mt-5 ml-1">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-[#D20000] mr-1"></div>
                      <span>선택</span>
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-[#BBBBBB] mr-1"></div>
                      <span>예매완료</span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#9E705D] mr-1"></div>
                      <span>선택가능</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>

        <div className="w-[160px] h-[300px] ml-1 mt-11">
          <img
            src="https://adimg.cgv.co.kr/images/202302/house/CGV_BUGS_160x300.png"
            alt="Right Ad"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="pretendard h-32 bg-[#1D1D1C] text-white/80 p-3">
        <div className="w-[996px] h-full mx-auto flex justify-between items-center">
          <button
            className="pretendard w-[106px] h-full rounded-xl border-[3px] font-bold text-white flex flex-col justify-center items-center border-[#979797] bg-[#343433]"
            onClick={() => {
              navigate("/ticket");
            }}
          >
            <FaArrowLeft size={41} className="mb-1" />
            영화선택
          </button>

          <div className="flex items-center">
            <div className="w-[212px] h-24 border-r-[3px] border-white/20 flex items-center overflow-hidden">
              {selectedMovie ? (
                <div className="flex">
                  <img
                    src={`${IMG_BASE_URL}${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="h-[104px] w-[74px] object-cover mr-4"
                  />
                  <p className="pt-4 pr-1 text-xs break-words overflow-hidden">
                    {selectedMovie.title}
                  </p>
                </div>
              ) : (
                <p className="mx-auto text-2xl text-white/50">영화선택</p>
              )}
            </div>

            <div className="w-[187px] h-24 border-r-[3px] border-white/20 flex items-center px-2">
              {selectedTheater || selectedDate ? (
                <div className="flex">
                  <div className="flex flex-col text-xs mr-1">
                    <span className="mb-1">극장</span>
                    <span className="mb-1">일시</span>
                    <span className="mb-1">상영관</span>
                    <span>인원</span>
                  </div>

                  <div className="flex flex-col text-xs font-bold">
                    <span className="mb-1">
                      {selectedTheater ? `CGV ${selectedTheater} >` : "-"}
                    </span>
                    <span className="mb-1">
                      {selectedDate && selectedTime
                        ? `${selectedDate}(${getWeekday(new Date(selectedDate))}) ${selectedTime}`
                        : selectedDate
                          ? `${selectedDate}(${getWeekday(new Date(selectedDate))})`
                          : "-"}
                    </span>
                    <span className="mb-1">{selectedHall || "-"}</span>
                    <span>{countsDisplay || "-"}</span>
                  </div>
                </div>
              ) : (
                <p className="mx-auto text-2xl text-white/50">극장선택</p>
              )}
            </div>

            {/* 선택된 좌석 및 가격 정보 */}
            <div className="w-[170px] h-24 p-2 border-r-[3px] border-white/20 text-2xl text-white/50">
              {selectedSeats.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <FaChevronRight size={33} />
                  좌석선택
                </div>
              ) : (
                <div className="h-full flex items-center text-white/80">
                  <span className="text-xs mr-1">좌석번호 </span>
                  <span className="font-bold text-xs mr-1">
                    {selectedSeats.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* 선택된 좌석 및 가격 정보 추가 */}
            {selectedSeats.length > 0 && (
              <div className="w-[140px] ml-4 font-bold text-xs text-white/80">
                {categoryTotals.map(({ type, count, price }) => (
                  <div
                    key={type}
                    className="flex items-center justify-between "
                  >
                    <p className="font-normal">{type}</p>
                    <p>
                      {price.toLocaleString()}원 × {count}
                    </p>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-normal">총 금액 </p>
                  <p className="text-[#BF2828]">
                    {totalAmount.toLocaleString()}원
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            className={`pretendard w-[106px] h-full rounded-xl border-[3px] font-bold text-white flex flex-col justify-center items-center ${
              isPayment
                ? "border-[#DC3434] bg-[#BF2828] cursor-pointer"
                : "border-[#979797] bg-[#343433] cursor-not-allowed"
            }`}
            onClick={handleNavigatePayment}
            disabled={!isPayment}
          >
            <FaArrowRight size={41} className="mb-1" />
            결제선택
          </button>
        </div>
      </div>
    </>
  );
}
