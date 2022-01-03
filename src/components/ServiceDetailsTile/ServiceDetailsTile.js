import React, { useState } from "react";
import classes from "./ServiceDetailsTile.module.css";
import Button from "../UI/Button/Button";

const ServiceDetailsTile = ({ service }) => {
  const [tickets, setTickets] = useState(0);

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
    console.log('confirmed');
  }

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
            min={0}
            onChange={ticketsHandler}
          ></input>
        </div>
      </div>

      <h4 className={classes.rowstart}>Details</h4>
      <div className={classes.row}>
        <div className={classes.left}>
          <div>From : {service.from}</div>
          <div>To : {service.to}</div>
          <div>Available Seats : {service.available_seats}</div>
          <div>Fare : {service.Fare}</div>
        </div>

        <div>
          <div className={classes.shortrow}>
            <div>Basic Fair</div>
            <div>{service.Fare}</div>
          </div>
          <div className={classes.shortrow}>
            <div>Tickets</div>
            <div>{tickets}</div>
          </div>
          <div className={classes.shortrow}>
            <div>Total bus fare</div>
            <div>{tickets * service.Fare}</div>
          </div>
          <div className={classes.shortrow}>
            <div>GST</div>
            <div>{getGst(service.Fare)}</div>
          </div>
          <div className={classes.shortrow}>
            <div>Road Tax</div>
            <div>{getRoadTax(service.Fare)}</div>
          </div>
          <div className={classes.shortrow}>
            <div>Service Tax</div>
            <div>{getServiceTax(service.Fare)}</div>
          </div>
          <hr/>
          <div className={classes.shortrow}>
            <div>Total Fare</div>
            <div>
              {getGst(service.Fare) +
                getServiceTax(service.Fare) +
                getRoadTax(service.Fare) +
                tickets * service.Fare}
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
