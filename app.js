import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let postId = 1;

app.get('/', (req, res) => {
  res.render('index.ejs', { posts });
});

app.post('/add', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  posts.push({ id: postId++, title, content });
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});