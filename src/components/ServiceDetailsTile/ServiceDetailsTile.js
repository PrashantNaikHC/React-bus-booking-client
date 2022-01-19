import React, { useEffect, useRef, useState } from "react";
import classes from "./ServiceDetailsTile.module.css";
import { bookSeatsAsync } from "../../store/booking-slice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Slide, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ServiceDetailsTile = ({ providerId, service }) => {
  const [tickets, setTickets] = useState(1);
  const [name, setName] = useState("");
  const [seatNumber, setSeatNumbers] = useState(null);
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const nameRef = useRef()
  const ticketsRef = useRef()

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    if(nameRef.current.value === "" || ticketsRef.current.value == 0) {
      return;  
    }
    setOpenDialog(true)
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const confirmBookingHandler = (event) => {
    const totalFare =
      getGst(tickets * service.Fare) +
      getServiceTax(tickets * service.Fare) +
      getRoadTax(tickets * service.Fare) +
      tickets * service.Fare +
      "₹";
    dispatch(
      bookSeatsAsync({
        name: name,
        seats: tickets,
        service_provider_id: providerId,
        route_id: service.route_id,
        positions: seatNumber,
        amount: totalFare,
      })
    );
    setOpen(true);
    setOpenDialog(false);
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

  const snackbar = (bookingObj) => {
    if (bookingObj.isLoading === false) {
      console.log("result >>", bookingObj);

      if (bookingObj.data === "error") {
        return (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {`${bookingObj.error}.`}
            </Alert>
          </Snackbar>
        );
      }

      if (bookingObj.data !== null) {
        return (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {`Booking confirmed. Check the booking status `}
              <a target="_blank" href={`http://localhost:3000/bookings`}>
                here
              </a>
              .
            </Alert>
          </Snackbar>
        );
      }
    }
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
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            inputRef={nameRef}
            type="text"
            id="name"
            name="Name"
            value={name}
            error={name === ""}
            helperText={name === "" && "Name cannot be left blank"}
            onChange={nameHandler}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Tickets"
            variant="filled"
            inputRef={ticketsRef}
            type="number"
            id="tickets"
            name="Tickets"
            value={service.available_seats === 0 ? 0 : tickets}
            onChange={ticketsHandler}
            InputProps={{
              inputProps: { min: 0, max: service.available_seats },
            }}
            error={tickets == 0}
            helperText={tickets == 0 && "minimum is one ticket"}
          />
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
          <div>
            Departure :{" "}
            {new Date(Date.parse(service.departure_time)).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </div>
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
            <Button variant="contained" onClick={handleDialogOpen}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
      {snackbar(booking)}
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>Please check and confirm the below booking details before proceeding with payment.</div>
            <hr/>
            <table>
              <th>Booking Details</th>
              <tr>
                <td>Name </td>
                <td>{name} </td>
              </tr>

              <tr>
                <td>From </td>
                <td>{service.from} </td>
              </tr>

              <tr>
                <td>To </td>
                <td>{service.to} </td>
              </tr>

              <tr>
                <td>Class </td>
                <td>{service.type} </td>
              </tr>

              <tr>
                <td>Seat numbers </td>
                <td>{seatNumber} </td>
              </tr>
              <tr>
                <td>Total amount </td>
                <td>{getGst(tickets * service.Fare) +
                getServiceTax(tickets * service.Fare) +
                getRoadTax(tickets * service.Fare) +
                tickets * service.Fare}{" "}
              ₹ </td>
              </tr>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={confirmBookingHandler}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceDetailsTile;
