import React from "react";
import { graphql } from "gatsby";

const PostTemplate = ({ data }) => {
  const post = data.wpPost;
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const altText =
    post.featuredImage?.node?.altText || post.title;

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>{post.title}</h1>

      {/* Featured Image (normal img, not Gatsby) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            marginBottom: "30px",
          }}
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
          sourceUrl
          altText
        }
      }
    }
  }
`;
