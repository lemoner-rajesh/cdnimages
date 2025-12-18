const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // 🔹 Build-time language flag
  const BUILD_LANG = (process.env.GATSBY_LANG || "en").toLowerCase();

  reporter.info(`🚀 Building language: ${BUILD_LANG}`);

  const result = await graphql(`
    {
      allWpPost {
        nodes {
          id
          slug
          language {
            code
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("Error loading WP posts", result.errors);
  }

  const postTemplate = path.resolve("./src/templates/post-template.js");
  const listingTemplate = path.resolve("./src/templates/post-listing.js");

  // 🔹 Filter posts MANUALLY (schema-safe)
  const filteredPosts = result.data.allWpPost.nodes.filter(
    node => node.language?.code?.toLowerCase() === BUILD_LANG
  );

  reporter.info(`✅ Found ${filteredPosts.length} ${BUILD_LANG.toUpperCase()} posts`);

  // 🔹 Create listing page ONCE
  createPage({
    path: `/${BUILD_LANG}`,
    component: listingTemplate,
    context: {
      // lang: BUILD_LANG.toUpperCase(),
lang: BUILD_LANG, // "en" | "ar"
    },
  });

  // 🔹 Create post pages
  filteredPosts.forEach(node => {
    createPage({
      path: `/${BUILD_LANG}/${node.slug}/`,
      component: postTemplate,
      context: {
        id: node.id,
        // lang: BUILD_LANG.toUpperCase(),
        lang: BUILD_LANG, // "en" | "ar"
      },
    });
  });
};
