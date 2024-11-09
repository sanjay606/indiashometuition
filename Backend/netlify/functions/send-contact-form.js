exports.handler = async (event, context) => {
  // Check if the HTTP method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found: Endpoint only accepts POST requests.' })
    };
  }

  try {
    // Parse the body of the request
    const data = JSON.parse(event.body);
    
    // Check for required fields in the data (e.g., name, email, message)
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Missing required fields (name, email, or message).' })
      };
    }

    // Debugging log to confirm receipt of data
    console.log("Received data:", data);

    // Here you would add logic to handle the data (e.g., save to database or send an email)

    // If everything is successful, return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission successful.' })
    };

  } catch (error) {
    // Log any errors that occur during processing
    console.error("Error handling request:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error: Something went wrong.' })
    };
  }
};
