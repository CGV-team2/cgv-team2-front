import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PiArrowUpThin } from "react-icons/pi";

const navItems = [
  { text: "영화", dropdown: ["무비차트", "아트하우스", "ICECON"] },
  { text: "극장", dropdown: ["CGV 극장", "특별관"] },
  {
    to: "/ticket",
    text: "예매",
    dropdown: [
      "빠른예매",
      "영화/예매",
      "English Ticketing",
      "English Schedule",
    ],
  },
  {
    to: "/store",
    text: "스토어",
    dropdown: [
      "패키지",
      "영화관람권",
      "기프트카드",
      "콤보",
      "팝콘",
      "음료",
      "스낵",
      "플레이존",
      "씨네샵 >",
    ],
  },
  {
    to: "/event",
    text: "이벤트",
    dropdown: [
      "SPECIAL",
      "영화/예매",
      "멤버십/CLUB",
      "CGV 극장별",
      "제휴할인",
      "당첨자 발표",
      "종료된 이벤트",
    ],
  },
  {
    to: "/adventage",
    text: "혜택",
    dropdown: ["CGV 할인정보", "CLUB 서비스", "VIP 라운지"],
  },
];

export default function FixedNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 194) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="pretendard fixed top-0 left-0 right-0 bg-gradient-to-r from-[#D74357] to-[#EF632F] text-white shadow-md z-50">
        <div
          ref={navRef}
          className="w-full relative"
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-[996px] mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://img.cgv.co.kr/R2014/images/common/logo/logoWhite.png"
                className="w-[70px] h-[32px] mr-14"
              />
              <ul className="flex text-base font-bold h-[60px] items-center">
                {navItems.map((item, index) => (
                  <li key={item.to} onMouseEnter={handleMouseEnter}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `${index === 0 ? "pl-0 mr-3.5" : "mx-3"} p-4`
                      }
                    >
                      {item.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 전체 드롭다운 메뉴 */}
          <div
            className={`absolute top-[60px] left-0 w-full bg-white border-b border-[#333333]/[.5] transition-all duration-500 ease-in-out transform ${
              dropdownVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-[996px] mx-auto text-[#333333]">
              <div className="grid grid-cols-6 gap-4 p-4">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-left border-[#333333]/[.07] border-r last:border-0"
                  >
                    <h3 className="font-bold mb-2">{item.text}</h3>
                    <ul>
                      {item.dropdown.map((dropdownItem, i) => (
                        <li
                          key={i}
                          className="text-sm text-[#333333]/[.8] py-1.5 hover:underline cursor-pointer"
                        >
                          {dropdownItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pretendard fixed right-[10%] bottom-20 flex">
        <button
          onClick={scrollToTop}
          className="h-[50px] w-[136px] bg-gradient-to-r from-[#FB4356] to-[#EF632F] text-white font-bold rounded-full drop-shadow-lg flex justify-center items-center mr-3"
        >
          예매하기
        </button>

        <button
          onClick={scrollToTop}
          className="h-[50px] w-[50px] bg-white text-[#333333] rounded-full border border-[#333333] drop-shadow-lg flex justify-center items-center"
        >
          <PiArrowUpThin size={30} />
        </button>
      </div>
    </>
  );
}
