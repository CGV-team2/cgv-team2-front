import React, { useState } from "react";
import BookingHeaderButton from "./BookingHeaderButton";
import TheaterSeating from "./TheaterSeating";

import { IoMdRefresh } from "react-icons/io";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";

export default function SeatSelection() {
  const [counts, setCounts] = useState({
    adult: 0,
    youth: 0,
    senior: 0,
    child: 0,
  });

  const totalPeople = Object.values(counts).reduce((acc, val) => acc + val, 0);

  const handleCountChange = (type, count) => {
    const newCounts = { ...counts, [type]: count };
    const newTotal = Object.values(newCounts).reduce(
      (acc, val) => acc + val,
      0
    );
    if (newTotal <= 8) {
      setCounts(newCounts);
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
                <span className="absolute right-4 flex items-center text-sm font-normal cursor-pointer">
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
                    <div>CGV 명동역 씨네라이브러리</div>
                    <div className="mx-3 h-4 w-px bg-gray-300"></div>
                    <div>4관 11층</div>
                    <div className="mx-3 h-4 w-px bg-gray-300"></div>
                    <div>
                      남은좌석{" "}
                      <span className="text-[#CA4D10] font-bold">122</span>
                      /123
                    </div>
                  </div>

                  <div className="helvetica mt-1.5 font-bold text-[22.8px] text-[#5A5A5A]">
                    2024.10.09 (수) 09:50 ~ 11:49
                  </div>

                  <button className="absolute bottom-4 right-5 text-xs py-[1px] px-1.5 rounded text-white bg-[#926F60] border border-[#745447]">
                    상영시간 변경하기
                  </button>
                </div>
              </div>

              <div className="pt-5 flex">
                <div className="w-[85%] flex flex-col items-center pl-5">
                  <TheaterSeating totalPeople={totalPeople} />
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
    </>
  );
}
