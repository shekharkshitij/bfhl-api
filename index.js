const express = require("express");
const app = express();
app.use(express.json());

// Your details
const FULL_NAME = "john_doe";   // change to your full name
const DOB = "17091999";         // change to your DOB (ddmmyyyy)
const EMAIL = "john@xyz.com";   // change to your email
const ROLL = "ABCD123";         // change to your roll number

// POST /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphabets = [];

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

    // concat string (reverse + alternating caps)
    let concat_string = "";
    let combinedAlpha = allAlphabets.join("").split("").reverse();
    concat_string = combinedAlpha
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});

// Run locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
