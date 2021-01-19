module.exports = app => {
  const post = require("../controllers/post.controller");
  const upload = require("../middleware/upload");


  // Create a new post
  app.post("/image",upload.single("file"), post.createImage);

  // Create a new post
  app.post("/post",upload.single("file"), post.createPost);

  // Retrieve  post
  app.get("/post/:postId", post.findPostById);

  // Retrieve all posts 
  app.get("/post", post.findAll);

  //  Delete post by Id 
  app.delete("/post/:postId", post.deletePostById);

  // Delete All posts 
  app.delete("/post", post.deleteAllPost);

  // Update post 
  app.put("/post/:postId", post.updatePost);

};