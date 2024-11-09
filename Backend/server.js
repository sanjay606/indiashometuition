exports.handler = async (event, context) => {
  // Allowing pre-flight OPTIONS requests for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://www.indiashometuition.com",  // Replace with your frontend URL
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Handling POST request (form submission)
  if (event.httpMethod === "POST") {
    try {
      // Parse the incoming request body (form data)
      const data = JSON.parse(event.body);

      console.log("Received Form Data:", data);

      // You can add your email sending logic here using services like nodemailer or integrate with third-party APIs
      // For now, just log the data and respond with a success message.

      // Response after successfully processing the form
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://www.indiashometuition.com", // Allow requests from your frontend
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "Form data received successfully" }),
      };
    } catch (error) {
      console.error("Error processing form data:", error);

      // Response in case of error
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "https://www.indiashometuition.com", // Allow requests from your frontend
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "An error occurred while processing the form." }),
      };
    }
  }

  // If method is not POST or OPTIONS, return 405 (Method Not Allowed)
  return {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin": "https://www.indiashometuition.com", // Allow requests from your frontend
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: "Method Not Allowed",
  };
};
