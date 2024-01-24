import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ reservation, hotel, rating, room }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const navigateHotel = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  const navigateRoom = () => {
    navigate(`/room/${room.id}`);
  };

  const color = isHovered === true ? "#088395" : "gray";
  const underline = isHovered === true ? "underline" : "none";
  const divStyle = {
    border: "1px solid rgba(0, 0, 0, 0.25)",
    padding: "0.5rem ",
    borderRadius: "10px",
    marginBottom: "0.5rem",
  };
  const typoStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  };
  return (
    <Box>
      {hotel && (
        <div style={divStyle}>
          <Typography sx={typoStyle}>
            <span>
              <span
                style={{
                  fontWeight: "550",
                }}
              >
                Name :{" "}
              </span>
              <span
                style={{
                  color: "#088395",
                }}
              >
                {hotel.name}
              </span>
            </span>
            {screenWidth > 400 ? (
              <span
                onClick={navigateHotel}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  color: color,
                  textDecoration: underline,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                view more
              </span>
            ) : (
              ""
            )}
          </Typography>
          <Typography fontSize="0.8rem">
            <span
              style={{
                fontWeight: "550",
              }}
            >
              City :{" "}
            </span>
            {hotel.city}
          </Typography>
          {screenWidth < 400 ? (
            <span
              onClick={navigateHotel}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                color: color,
                textDecoration: underline,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              view more
            </span>
          ) : (
            ""
          )}
        </div>
      )}
      {reservation && (
        <div>
          <Typography>
            {reservation.Room.number}
            {reservation.Room.quality}
          </Typography>
        </div>
      )}
      {rating && (
        <div>
          <Typography sx={typoStyle}>
            <span>
              <span
                style={{
                  fontWeight: "550",
                }}
              >
                Room Number :{" "}
              </span>
              <span
                style={{
                  color: "#088395",
                }}
              >
                {room.number}
              </span>
            </span>
            {screenWidth > 400 ? (
              <span
                onClick={navigateHotel}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  color: color,
                  textDecoration: underline,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                view more
              </span>
            ) : (
              ""
            )}
          </Typography>
          <Typography>{rating.Hotel.name}</Typography>
        </div>
      )}
      {room && (
        <div style={divStyle}>
          <Typography sx={typoStyle}>
            <span>
              <span
                style={{
                  fontWeight: "550",
                }}
              >
                Quality :{" "}
              </span>
              <span
                style={{
                  color: "#088395",
                }}
              >
                {room.quality}
              </span>
            </span>
            {screenWidth > 400 ? (
              <span
                onClick={navigateRoom}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  color: color,
                  textDecoration: underline,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                view more
              </span>
            ) : (
              ""
            )}
          </Typography>
          <Typography fontSize="0.8rem" mb='0.5rem'>
            <span
              style={{
                fontWeight: "550",
              }}
            >
              Hotel :{" "}
            </span>
            {room.Hotel.name}
          </Typography>
          <Typography fontSize="0.8rem">
            <span
              style={{
                fontWeight: "550",
              }}
            >
              Room number :{" "}
            </span>
            {room.number}
          </Typography>
          {screenWidth < 400 ? (
            <span
              onClick={navigateRoom}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                color: color,
                textDecoration: underline,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              view more
            </span>
          ) : (
            ""
          )}
        </div>
      )}
    </Box>
  );
};

export default ActivityCard;
