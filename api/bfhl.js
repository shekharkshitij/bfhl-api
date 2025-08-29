module.exports = (req, res) => {
  if (req.method === "POST") {
    const data = req.body?.data || [];

    let odd_numbers = [], even_numbers = [], alphabets = [], special_characters = [];
    let sum = 0, allAlphabets = [];

    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allAlphabets.push(item);
      } else {
        special_characters.push(item);
      }
    });

    let combinedAlpha = allAlphabets.join("").split("").reverse();
    let concat_string = combinedAlpha.map((ch,i)=> i%2===0? ch.toUpperCase():ch.toLowerCase()).join("");

    return res.status(200).json({
      is_success: true,
      user_id: "kshitij_kumar_22BAI1161",
      email: "kshitij.kumar2022@vitstudent.ac.in",
      roll_number: "22BAI1161",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } else {
    res.status(405).json({ is_success: false, message: "Only POST allowed" });
  }
};
