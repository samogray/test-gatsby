/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require('gatsby-source-filesystem')

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/pages/template-article.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    query loadPagesQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              slug
              title
              date(formatString: "")
              author
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // Create blog post pages.
    result.data.allMarkdownRemark.edges.forEach(({node: post}) => {
      const {html, frontmatter} = post
      const {title, author, date, slug} = frontmatter
      createPage({
        // Path for this page — required
        path: `${slug}`,
        component: blogPostTemplate,
        context: {
          html,
          title,
          author,
          date,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  })
}

const createNodeFieldMarkdownRemark = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateNode = nodeContext => {
  createNodeFieldMarkdownRemark(nodeContext)
}