const isLocalSource = (useLocal) => {
  if (useLocal) {
    return "http://localhost:5000/react-bus-services/";
  } else {
    return "http://117.192.45.212/react-bus-services/";
  }
};

export const getServiceProviders = async () => {
  const response = await fetch(`${isLocalSource(true)}providers`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data");
  }
  if (response.status === 400) {
    throw new Error(data.message || "Could not fetch data");
  }
  console.log("api getServiceProviders", data);
  return data;
};

export const getServices = async (id) => {
  const response = await fetch(
    `${isLocalSource(true)}services?` +
      new URLSearchParams({ service_provider_id: id })
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data");
  }
  if (response.status === 400) {
    throw new Error(data.message || "Could not fetch data");
  }
  console.log("api getServices", data);
  return data;
};

export const getBookings = async () => {
  const response = await fetch(
    `${isLocalSource(true)}bookings`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data");
  }
  if (response.status === 400) {
    throw new Error(data.message || "Could not fetch data");
  }
  console.log("api getBookings", data);
  return data;
};

// expects body of {"seats":"1", "service_provider_id":"789123", "route_id":"852"}
export const bookSeats = async (bookingDetails) => {
  // headers is required here to send the body
  const response = await fetch(`${isLocalSource(true)}book`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingDetails),
  });

  const data = await response.json();
  if (!response.ok) {
    console.log('data  >',data.data);
    throw new Error(data.data);
  }
  if (response.status === 400) {
    console.log('data  >>',data);
    throw new Error(data);
  }
  console.log("api bookSeats", data);
  return data;
};
