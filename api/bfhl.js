// Serverless function for /bfhl endpoint
module.exports = (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body?.data || [];

      let odd_numbers = [];
      let even_numbers = [];
      let alphabets = [];
      let special_characters = [];
      let sum = 0;
      let allAlphabets = [];

      // Classify inputs
      data.forEach(item => {
        if (/^\d+$/.test(item)) {
          let num = parseInt(item);
          sum += num;
          if (num % 2 === 0) {
            even_numbers.push(item);
          } else {
            odd_numbers.push(item);
          }
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
          allAlphabets.push(item);
        } else {
          special_characters.push(item);
        }
      });

      // Concat string (reverse + alternating caps)
      let combinedAlpha = allAlphabets.join("").split("").reverse();
      let concat_string = combinedAlpha
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");

      // Final response
      return res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999",   // change with your details
        email: "john@xyz.com",          // change with your email
        roll_number: "ABCD123",         // change with your roll no
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
      });
    } catch (err) {
      return res.status(500).json({ is_success: false, message: err.message });
    }
  } else {
    return res.status(405).json({ is_success: false, message: "Only POST allowed" });
  }
};
