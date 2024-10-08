import React, { useState, useMemo } from "react";

const theaterData = {
  서울: ["강남", "강변", "건대입구", "구로", "대학로", "동대문", "등촌"],
  경기: ["경기광주", "광교", "기흥", "범계", "산본"],
  인천: ["계양", "부평", "인천", "청라"],
  강원: ["강릉", "인제", "춘천"],
  대전: ["논산", "서산", "세종", "아산"],
  대구: ["대구", "대구스타디움", "대구수성", "대구현대", "대구월성"],
  부산: ["해운대", "센텀시티", "서면", "동래", "아시아드"],
  경상: ["거제", "김해", "구미", "마산", "창원"],
  제주: ["제주"],
};

const TheaterSelector = ({ onSelectTheater }) => {
  const [selectedRegion, setSelectedRegion] = useState(
    Object.keys(theaterData)[0]
  );
  const [selectedTheater, setSelectedTheater] = useState(null);

  const regionsWithCount = useMemo(() => {
    return Object.entries(theaterData).map(([region, theaters]) => ({
      name: region,
      count: theaters.length,
    }));
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedTheater(null);
  };

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    onSelectTheater(theater);
  };

  return (
    <div className="flex border-t border-[#D4D3C9] p-4">
      <div className="w-1/2 bg-[#E6E4D9]">
        <ul>
          {regionsWithCount.map(({ name, count }) => (
            <li
              key={name}
              className={`font-normal text-xs text-right cursor-pointer p-2 border border-[#F2F0E5] ${
                selectedRegion === name ? "bg-[#F2F0E5]" : ""
              }`}
              onClick={() => handleRegionClick(name)}
            >
              {name}({count})
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/2">
        <ul>
          {selectedRegion &&
            theaterData[selectedRegion].map((theater) => (
              <li
                key={theater}
                className={`cursor-pointer p-2 ${
                  selectedTheater === theater ? "bg-[#333333] text-white" : ""
                }`}
                onClick={() => handleTheaterClick(theater)}
              >
                {theater}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TheaterSelector;
