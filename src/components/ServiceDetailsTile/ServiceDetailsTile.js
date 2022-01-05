import React, { useEffect, useState } from "react";
import classes from "./ServiceDetailsTile.module.css";
import Button from "../UI/Button/Button";
import { bookSeatsAsync } from "../../store/booking-slice";
import { useDispatch } from "react-redux";

const ServiceDetailsTile = ({ service }) => {
  const [tickets, setTickets] = useState(1);
  const [seatNumber, setSeatNumbers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    selectedSeats(tickets);
  }, [tickets, service]);

  // 5 % of the fare
  const getGst = (fare) => {
    return fare * 0.08;
  };

  // 1% of the fare
  const getRoadTax = (fare) => {
    return fare * 0.01;
  };

  // 2% of the fare
  const getServiceTax = (fare) => {
    return fare * 0.02;
  };

  const ticketsHandler = (event) => {
    setTickets(event.target.value);
    console.log(event.target.value);
  };

  const confirmBookingHandler = (event) => {
    console.log("confirmed");
    dispatch(
      bookSeatsAsync({
        seats: "1",
        service_provider_id: "789123",
        route_id: "852",
      })
    );
  };

  const selectedSeats = (seats) => {
    let text = "";
    const from = service.total_seats - service.available_seats;
    const to = from + +seats;
    console.log("from", from, "to", to, "seats", seats);
    if (to > service.total_seats) {
      text = "Bus completely booked.";
    } else {
      for (let s = from; s < to; s++) {
        text += "S" + (+s + 1) + " ";
      }
    }

    setSeatNumbers(text);
  };

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <h2>Booking</h2>
        <h4>
          {service.from} - {service.to} ({service.available_seats})
        </h4>
      </div>

      <div className={classes.row}>
        <div>
          <div className={classes.label}>
            <label htmlFor="name">Name :</label>
          </div>
          <input id="name" name="name"></input>
        </div>

        <div>
          <div className={classes.label}>
            <label htmlFor="tickets">Tickets :</label>
          </div>
          <input
            type="number"
            id="tickets"
            name="tickets"
            max={service.available_seats}
            value={service.available_seats === 0 ? 0 : tickets}
            min={0}
            onChange={ticketsHandler}
          ></input>
        </div>
      </div>

      <h4 className={classes.rowstart}>Details</h4>
      <div className={classes.row}>
        <div className={classes.left}>
          <div>{service.type}</div>
          <div>Seats selected: {seatNumber}</div>
          <div>Fare : {service.Fare}</div>
          <br />
          <div>From : {service.from}</div>
          <div>To : {service.to}</div>
          <br />
        </div>

        <div>
          <div className={classes.shortrow}>
            <div>Basic Fair</div>
            <div>{service.Fare} ₹</div>
          </div>
          <div className={classes.shortrow}>
            <div>Tickets</div>
            <div>{tickets}</div>
          </div>
          <div className={classes.shortrow}>
            <div>Total bus fare</div>
            <div>{tickets * service.Fare} ₹</div>
          </div>
          <div className={classes.shortrow}>
            <div>GST</div>
            <div>{getGst(tickets * service.Fare)} ₹</div>
          </div>
          <div className={classes.shortrow}>
            <div>Road Tax</div>
            <div>{getRoadTax(tickets * service.Fare)} ₹</div>
          </div>
          <div className={classes.shortrow}>
            <div>Service Tax</div>
            <div>{getServiceTax(tickets * service.Fare)} ₹</div>
          </div>
          <hr />
          <div className={classes.shortrow}>
            <div>Total Fare</div>
            <div>
              {getGst(tickets * service.Fare) +
                getServiceTax(tickets * service.Fare) +
                getRoadTax(tickets * service.Fare) +
                tickets * service.Fare}{" "}
              ₹
            </div>
          </div>
          <div className={classes.right}>
            <Button onClick={confirmBookingHandler}>Confirm Booking</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsTile;
