import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import "./posts.css";

const PostsPage = ({ data, pageContext }) => {
  const { lang } = pageContext;
  const posts = data.allWpPost.nodes;

  return (
    <main
      className="posts-wrapper"
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <h1 className="page-title">
        {lang === "ar" ? "جميع المقالات" : "All Posts"} ({posts.length})
      </h1>

      <div className="posts-grid">
        {posts.map(post => {
          const image = getImage(
            post.featuredImage?.node?.localFile?.childImageSharp
          );

          return (
            <article key={post.id} className="post-card">
              <Link to={`/${lang}/${post.slug}/`} className="post-link">
                {image && (
                  <GatsbyImage
                    image={image}
                    alt={post.featuredImage?.node?.altText || post.title}
                    className="post-image"
                  />
                )}

                <div className="post-content">
                  <h2>{post.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
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
  query PostsListingByLang($lang: String!) {
    allWpPost(
      sort: { date: DESC }
      filter: { language: { code: { eq: $lang } } }
    ) {
      nodes {
        id
        slug
        title
        excerpt
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
