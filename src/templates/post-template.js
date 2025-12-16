import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PostTemplate = ({ data }) => {
  const post = data.wpPost;
  const featuredImage = getImage(
    post.featuredImage?.node?.localFile?.childImageSharp
  );

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>{post.title}</h1>

      {/* Featured Image */}
      {featuredImage && (
        <GatsbyImage
          image={featuredImage}
          alt={post.featuredImage.node.altText || post.title}
          style={{ marginBottom: "30px" }}
        />
      )}

      {/* Content */}
      <section
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ marginTop: "40px" }}
      />
    </main>
  );
};

export default PostTemplate;

export const query = graphql`
  query PostById($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`;
