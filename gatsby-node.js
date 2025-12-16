const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWpPost{
        nodes {
          id
          slug
          uri
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("Error loading WP posts", result.errors);
  }

  const postTemplate = path.resolve("./src/templates/post-template.js");

  result.data.allWpPost.nodes.forEach(post => {
    createPage({
      path: post.uri,
      component: postTemplate,
      context: {
        id: post.id,
      },
    });
  });
};
