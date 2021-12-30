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

export const bookSeats = async () => {
  // todo
};
