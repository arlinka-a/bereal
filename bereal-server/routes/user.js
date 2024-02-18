const jwt = require('jsonwebtoken');

const users = [
    // This is a dummy user for demonstration purposes
    {
      id: 1,
      username: 'user',
      password: 'password', // Never store passwords like this in a real app
    },
  ];
  
  
  // Login route
  exports.login('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });

  exports.signup('/api/user/signup', async (req, res) => {
    try {
      const newUser = new User(req.body);
      const result = await newUser.save();
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  