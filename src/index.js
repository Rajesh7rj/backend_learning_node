// require("dotenv").config();
import express from 'express';
const app = express()

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!')
});
  
  const blogPosts = [
    {
        id: 1,
        title: "The Journey of Coding",
        description: "Discover the transformative journey of coding and how it can change your perspective on problem-solving.",
        date: "2024-11-17",
        author: "Nitin Sharma"
    },
    {
        id: 2,
        title: "Understanding JavaScript",
        description: "A deep dive into JavaScript, exploring its quirks and features that make it essential for web development.",
        date: "2024-11-16",
        author: "Aisha Khan"
    },
    {
        id: 3,
        title: "The Future of Web Development",
        description: "An exploration of upcoming trends in web development and how they will shape user experiences.",
        date: "2024-11-15",
        author: "Mark Thompson"
    },
    {
        id: 4,
        title: "CSS Flexbox: A Beginner's Guide",
        description: "Learn how to use CSS Flexbox to create responsive layouts with ease and flexibility.",
        date: "2024-11-14",
        author: "Emily Davis"
    },
    {
        id: 5,
        title: "Node.js for Beginners",
        description: "A comprehensive introduction to Node.js, covering its key features and how to build your first application.",
        date: "2024-11-13",
        author: "James Lee"
    }
];

  app.get('/blog', (req, res) => {
    res.send(blogPosts)
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})