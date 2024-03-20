import express from "express";
import multer from "multer";
import path from "path";
import Post from "./models/post.js";
import data from "./data/data.js";
import { log } from "console";

const app = express();
const port = 3000;

/* Setting Multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

/* Static Folder */
app.use(express.static("public"));
app.use("/css", express.static("dist"));

/* Routes */
app.get("/", (req, res) => {
  console.log(data.length);
  res.render("index.ejs", { posts: data, currentUrl: req.originalUrl });
});

app.get("/post/:postId", (req, res) => {
  const postId = req.params.postId;
  const currentPost = data.find((post) => post.id === parseInt(postId));

  if (!currentPost) {
    return res.status(404).send("Post not found");
  }

  res.render("post-page.ejs", {
    data,
    currentPost,
    currentUrl: req.originalUrl,
  });
});

app.get("/add-post", (req, res) => {
  const success = req.query.success;
  res.render("add-post.ejs", { success, currentUrl: req.originalUrl });
});

app.post("/add-post/submit", upload.single("image"), (req, res) => {
  try {
    let name = req.body["name"];
    let title = req.body["title"];
    let content = req.body["content"];
    let image = req.file.filename;

    if (!name || !title || !content || !image) {
      throw new Error("Incomplete form data");
    }

    data.push(new Post(name, title, content, image));

    res.redirect("/add-post?success=true");
  } catch (error) {
    console.error(error);

    res.redirect("/add-post?success=false");
  }
});

app.get("/post/:postId/edit", (req, res) => {
  const success = req.query.success;

  const postId = req.params.postId;
  const currentPost = data.find((post) => post.id === parseInt(postId));

  if (!currentPost) {
    return res.status(404).send("Post not found");
  }

  res.render("edit-post.ejs", {
    currentPost,
    success,
    currentUrl: req.originalUrl,
  });
});

app.post("/post/:postId/edit/submit", upload.single("image"), (req, res) => {
  const postId = req.params.postId;
  const currentPost = data.find((post) => post.id === parseInt(postId));

  if (!currentPost) {
    return res.status(404).send("Post not found");
  }

  try {
    let name = req.body["name"];
    let title = req.body["title"];
    let content = req.body["content"];
    let image = "";

    if (!req.file) {
      image = currentPost.image;
    } else {
      image = req.file.filename;
    }

    if (!name || !title || !content) {
      throw new Error("Incomplete form data");
    }

    data.forEach((post) => {
      if (post.id === currentPost.id) {
        post.name = name;
        post.title = title;
        post.content = content;
        post.image = image;
      }
    });

    res.redirect("/post/" + postId + "/edit?success=true");
  } catch (error) {
    console.error(error);

    res.redirect("/post/" + postId + "/edit?success=false");
  }
});

app.get("/post/:postId/delete", (req, res) => {
  const postId = req.params.postId;
  const currentPost = data.find((post) => post.id === parseInt(postId));

  if (!currentPost) {
    return res.status(404).send("Post not found");
  }

  let postIndex = data.indexOf(currentPost);

  if (postIndex > -1) {
    data.splice(postIndex, 1);
  }

  res.redirect("/");
});

app.post("/load-posts", express.json(), (req, res) => {
  const postsLength = req.body.postsLength;
  let posts = [];

  console.log(postsLength);

  for (let i = postsLength; i < parseInt(postsLength) + 6; i++) {
    posts.push(data[i]);
  }

  res.send(posts);
});

/* Server */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
