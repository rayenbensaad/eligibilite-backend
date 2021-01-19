const db = require("../models");
const Post = db.post;
const Image = db.image;
const fs = require("fs");


exports.createImage = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/uploads/" + req.file.filename
      ),
    }).then((image) => {
      console.log(__dirname);

      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

// Create and Save a new Post
exports.createPost = (req, res) => {
  // Validate request


  console.log(req.file.filename);

  if (!req.body.author) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Post
  const post = {
    author: req.body.author,
    createdAt: req.body.createdAt,
    subject: req.body.subject,
    content: req.body.content,
    picture: req.file.filename,
  };

  // Save post in the database
  Post.create(post)
    .then(data => {
      res.send(data),
      fs.writeFileSync(
        __basedir + "./uploads" , data.picture
       
    )
      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    });
};

// Get the  post by id
exports.findPostById = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving post with id=" + postId
      });
    });
};


// Get all posts 
exports.findAll = (req, res) => {
  Post.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving posts"
      });
    });
};


// Delete post by Id
exports.deletePostById = (req, res) => {
  const postId = req.params.postId;

  Post.destroy({
    where: {
      id: postId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Delete All post
exports.deleteAllPost = (req, res) => {

  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} post were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Post."
      });
    });
};


// update post
exports.updatePost = (req, res) => {
  const postId = req.params.postId;

  Post.update(req.body, {
    where: { id: postId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating post with id=" + id
      });
    });
};