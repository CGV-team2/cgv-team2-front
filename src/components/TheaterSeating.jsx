import React, { useEffect, useState } from "react";

const SeatRow = ({
  row,
  seats,
  selectedSeats,
  onSeatClick,
  bookedSeats,
  maxSeats,
  hoverSeats,
  onSeatHover,
}) => {
  return (
    <div className="flex items-center">
      <span className="w-4 text-xs font-bold mr-2 text-[#4A4A49]">{row}</span>
      <div className="flex space-x-[1px]">
        {seats.map((seat) => {
          const seatId = `${row}${seat}`;
          const isSelected = selectedSeats.includes(seatId);
          const isBooked = bookedSeats.includes(seatId);
          const isHovered = hoverSeats.includes(seatId);

          return (
            <button
              key={seatId}
              className={`w-4 h-4 text-[10px] font-bold text-white ${
                isBooked
                  ? "bg-[#BBBBBB] cursor-not-allowed"
                  : isSelected
                    ? "bg-[#D20000]"
                    : isHovered
                      ? "bg-[#D20000]"
                      : "bg-[#9E705D]"
              }`}
              onClick={() => onSeatClick(seatId)}
              onMouseEnter={() => onSeatHover(seatId)}
              onMouseLeave={() => onSeatHover(null)}
              disabled={
                isBooked || isSelected || selectedSeats.length >= maxSeats
              }
            >
              {seat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TheaterSeating = ({ totalPeople }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoverSeats, setHoverSeats] = useState([]);
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 5;
  const bookedSeats = ["A1", "B2", "C3", "D4", "E5"];

  const handleSeatClick = (seat) => {
    if (selectedSeats.length >= totalPeople) return; // 선택이 완료되면 클릭을 막음

    const seatIndex = selectedSeats.indexOf(seat);
    if (seatIndex !== -1) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      const seatNumber = parseInt(seat.slice(1));
      const rowLetter = seat[0];
      let seatsToAdd = [seat];

      if (totalPeople - selectedSeats.length >= 2 && seatNumber < seatsPerRow) {
        const adjacentSeat = `${rowLetter}${seatNumber + 1}`;
        if (!bookedSeats.includes(adjacentSeat)) {
          seatsToAdd.push(adjacentSeat);
        }
      }

      if (selectedSeats.length + seatsToAdd.length <= totalPeople) {
        setSelectedSeats((prev) => [...prev, ...seatsToAdd]);
      }
    }
  };

  const handleSeatHover = (seat) => {
    if (!seat || selectedSeats.length >= totalPeople) {
      setHoverSeats([]);
      return;
    }

    const seatNumber = parseInt(seat.slice(1));
    const rowLetter = seat[0];
    let seatsToHover = [seat];

    if (totalPeople - selectedSeats.length >= 2 && seatNumber < seatsPerRow) {
      const adjacentSeat = `${rowLetter}${seatNumber + 1}`;
      if (!bookedSeats.includes(adjacentSeat)) {
        seatsToHover.push(adjacentSeat);
      }
    }

    setHoverSeats(seatsToHover);
  };

  useEffect(() => {
    console.log(selectedSeats);
  }, [selectedSeats]);

  return (
    <>
      <div className="pretendard w-[79%] h-[26px] mb-[60px] bg-[#D8D6D1]/[.5] text-[#3B3B3A] font-bold flex items-center justify-center">
        SCREEN
      </div>
      <div className="space-y-[1px]">
        {rows.map((row) => (
          <SeatRow
            key={row}
            row={row}
            seats={Array.from({ length: seatsPerRow }, (_, i) => i + 1)}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            bookedSeats={bookedSeats}
            maxSeats={totalPeople}
            hoverSeats={hoverSeats}
            onSeatHover={handleSeatHover}
          />
        ))}
      </div>
    </>
  );
};

export default TheaterSeating;
