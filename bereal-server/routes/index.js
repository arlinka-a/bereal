const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const axios = require('axios'); 
const multer = require('multer');
const mammoth = require('mammoth');
const fs = require('fs');
require('dotenv').config();
const upload = multer({ dest: 'uploads/' });


// users
//       create
router.post("/users/signup", async (req, res) => {
  try {
    console.log(req.body);
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).send(user);
    } catch (error) {
    res.status(500).send(error.message);
  }
});

// login with existing
router.post("/users/login", async (req, res) => {
  try{
    const { username, password } = req.body;
    const user = await User.find({username});
    if (user[0].password === password) {
      return res.status(200).send(user); 
    } 
    return res.status(400).send("Invalid credentials"); 
  } catch (error) {
    res.status(500).send(error.message);
    return; 
  }});


  router.post('/questions/generate-question', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Extract text from .docx file
    mammoth.extractRawText({ path: req.file.path })
      .then(async (result) => {
        const text = result.value; // The extracted text
        const prompt = `Read the following text and generate a single-choice question with 4 options:\n\n${text}`;
  
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
              model: 'gpt-3.5-turbo', // Adjust the model as needed
              prompt: prompt,
              temperature: 0.5,
              max_tokens: 150,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
              n: 1, // Generate one completion
            },
            {
              headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          // Send the generated question back to the frontend
          res.json({ question: response.data.choices[0].text });
        } catch (error) {
          if (error.response) {
            console.error( error.response.data);
          } else if (error.request) {
            console.error( error.request);
          } else {
            console.error('Error', error.message);
          }
          // console.error('Failed to generate questions:', error);
          // res.status(500).send('Failed to generate questions');
        }
      })
      .catch((err) => {
        console.error('Failed to extract text from docx:', err);
        res.status(500).send('Failed to extract text');
      })
      .finally(() => {
        // Cleanup: remove the uploaded file after processing
        fs.unlinkSync(req.file.path);
      });
  });


module.exports = router;