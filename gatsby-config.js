/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `cdnimages`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://somu360.com/graphql",     
        schema: {
      perPage: 50,              // reduce load
      requestConcurrency: 2,    // reduce GraphQL pressure
    },

   
  },         
    
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp"]
};