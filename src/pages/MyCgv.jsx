import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function MyCgv() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const MySeat = async () => {
      try {
        const response = await api().get("/Member/seats");
        const filteredSeats = response.data.map((seat) => ({
          seatNumber: seat.seatNumber,
          showtimeDate: new Date(seat.showtimeDate).toLocaleString(),
          screenName: seat.screenName,
          movieName: seat.movieName,
          theaterName: seat.theaterName,
        }));
        setSeats(filteredSeats);
      } catch (error) {
        console.error(error);
      }
    };

    MySeat();
  }, []);

  return (
    <div className="pretendard w-[996px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">나의 예약 좌석</h2>
      {seats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seats.map((seat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-red-600 text-center text-white py-2 px-4">
                <h3 className="text-xl font-semibold">{seat.movieName}</h3>
              </div>
              <div className="p-4">
                <div className="w-full text-gray-600 flex">
                  <p className="w-[70px] text-start font-semibold mr-2">
                    좌석 번호
                  </p>{" "}
                  <p>{seat.seatNumber}</p>
                </div>
                <div className="w-full text-gray-600 flex">
                  <p className="w-[70px] text-start font-semibold mr-2">
                    상영 날짜
                  </p>{" "}
                  <p>{seat.showtimeDate}</p>
                </div>
                <div className="w-full text-gray-600 flex">
                  <p className="w-[70px] text-start font-semibold mr-2">
                    상영관
                  </p>{" "}
                  <p>{seat.screenName}</p>
                </div>
                <div className="w-full text-gray-600 flex">
                  <p className="w-[70px] text-start font-semibold mr-2">극장</p>{" "}
                  <p>CGV {seat.theaterName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-lg">예약된 좌석이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
