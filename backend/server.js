//This is the starting point of your backend.

import app from "./src/app.js";// Importing express app from the src/app.js field

const PORT = process.env.PORT || 5000;// Setting the port to either the environment variable PORT or defaulting to 5000

app.listen(PORT, () => {  // Starting the server and listening on the specified port
  console.log(`Server is running on port ${PORT}`);
});
