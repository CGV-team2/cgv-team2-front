import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BookingHeaderButton() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (window.confirm("예매 정보를 초기화하시겠습니까?")) {
      navigate("/ticket", { replace: true });
      window.location.reload();
    }
  };

  return (
    <>
      <div className="pretendard flex justify-end mb-3 text-[#333333] font-bold">
        <button className="flex items-center py-0.5 px-3 bg-[#F2F0E5] rounded border border-black text-[13px]">
          ENGLISH
        </button>

        <button className="flex items-center py-0.5 px-2 bg-[#F2F0E5] rounded border border-black text-[13px] mx-1.5">
          <MdOutlineAccessTimeFilled size={22} className="mr-1" />
          상영시간표
        </button>

        <button
          className="flex items-center py-0.5 px-2 bg-[#F2F0E5] rounded border border-black text-[13px]"
          onClick={handleRefresh}
        >
          <IoMdRefresh size={24} className="mr-1" />
          예매 다시하기
        </button>
      </div>
    </>
  );
}
