import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getBookings } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./BookingStatus.module.css";

export default function BookingStatus() {
  const { sendRequest, status, data, error } = useHttp(getBookings);

  useEffect(() => {
    sendRequest();
  }, []);

  if (error) {
    console.log("error");
    return <p>{error}</p>;
  }

  if (status === "completed") {
    console.log("data >> ", data.rating);
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if(status === "completed" && data.length === 0) {
      console.log("emm");
      return <h1>Currently no bookings!</h1>
  }

  return (
    <div className={classes.block}>
      {status === "completed" &&
        data.map((booking) => (
          <div>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent className={classes.item}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <strong>{booking.from}</strong> to{" "}
                      <strong>{booking.to}</strong>
                    </Typography>
                    <Typography variant="h5" component="div">
                      {booking.type}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {booking.positions}
                    </Typography>
                    <Typography variant="body2">
                      Name : {booking.name}
                    </Typography>
                    <Typography variant="body2">
                      Total amount paid : {booking.amount}
                    </Typography>
                    <Typography variant="body2">
                      Departure :{" "}
                      {new Date(
                        Date.parse(booking.departure_time)
                      ).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </React.Fragment>
              </Card>
            </Box>
          </div>
        ))}
    </div>
  );
}
