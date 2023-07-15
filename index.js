const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

/**
 * /bmi:
 *  get:
 *    description: Calculate Body Mass Index (BMI)
 *    parameters:
 *      - name: weight
 *        description: Weight in kilograms
 *        required: true
 *      - name: height
 *        description: Height in centimeters
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response consists of the calculated BMI in the form {"bmi": number}
 */
app.get('/bmi', (req, res) => {
  const height = parseFloat(req.query.height);
  const weight = parseFloat(req.query.weight);
  const bmi = weight / (height * height / 10000);
  res.json({ bmi: bmi.toFixed(2) });
});

/**
 * /bodyfat:
 *  get:
 *    description: Calculate body fat percentage
 *    parameters:
 *      - name: height
 *        description: Height in centimeters
 *        required: true
 *      - name: neck
 *        description: Neck circumference in centimeters
 *        required: true
 *      - name: waist
 *        description: Waist circumference in centimeters
 *        required: true
 *      - name: hips
 *        description: Hip circumference in centimeters
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response consists of the calculated body fat percentage in the form {"bodyfat": number}
 */
app.get('/bodyfat', (req, res) => {
  // Assuming we're using U.S. Navy body fat formula
  const height = parseFloat(req.query.height);
  const neck = parseFloat(req.query.neck);
  const waist = parseFloat(req.query.waist);
  const hips = parseFloat(req.query.hips);
  const bodyFat = 495 / (1.29579 - .35004 * Math.log10(waist + hips - neck) + 0.22100 * Math.log10(height)) - 450;
  res.json({ bodyFat: bodyFat.toFixed(2) });
});

/**
 * /idealweight:
 *  get:
 *    description: Calculate ideal weight
 *    parameters:
 *      - name: height
 *        description: Height in centimeters
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response consists of the calculated ideal weight in the form {"idealweight": number}
 */
app.get('/idealweight', (req, res) => {
  // Assuming we're using the Devine formula for men
  const height = parseFloat(req.query.height);
  const idealWeight = 50 + 0.9 * (height - 152.4);
  res.json({ idealWeight: idealWeight.toFixed(2) });
});

/**
 * /caloriesburned:
 *  get:
 *    description: Calculate calories burned
 *    parameters:
 *      - name: weight
 *        description: Weight in kilograms
 *        required: true
 *      - name: duration
 *        description: Duration of activity in minutes
 *        required: true
 *      - name: met
 *        description: Metabolic Equivalent of Task (MET) value
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response consists of the calculated calories burned in the form {"caloriesburned": number}
 */
app.get('/caloriesburned', (req, res) => {
  // Assuming we're using METs (Metabolic Equivalent of Task) for walking at 3.0 mph
  const weight = parseFloat(req.query.weight);
  const duration = parseFloat(req.query.duration);
  const met = parseFloat(req.query.met);  
  const caloriesBurned = weight * met * (duration / 60);
  res.json({ caloriesBurned: caloriesBurned.toFixed(2) });
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));