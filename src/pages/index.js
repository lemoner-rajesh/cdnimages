import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./posts.css";

const PostsPage = ({ data }) => {
  const posts = data.allWpPost.nodes;

  return (
    <main className="posts-wrapper">
      <h1 className="page-title">All Posts ({posts.length})</h1>

      <div className="posts-grid">
        {posts.map(post => {
          const image = getImage(
            post.featuredImage?.node?.localFile?.childImageSharp
          );

          return (
            <article key={post.id} className="post-card">
              <Link to={post.uri} className="post-link">
                {image && (
                  <GatsbyImage
                    image={image}
                    alt={post.featuredImage.node.altText || post.title}
                    className="post-image"
                  />
                )}

                {console.log("img",post)}

                <div className="post-content">
                  <h2>{post.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                  />
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default PostsPage;

export const query = graphql`
  query AllPostsListing {
    allWpPost(sort: { date: DESC }) {
      nodes {
        id
        title
        excerpt
        uri
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  height: 260
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`;
