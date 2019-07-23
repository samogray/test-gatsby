import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          nodes {
            excerpt
            frontmatter {
              title
              date
              slug
              image {
                childImageSharp {
                  fluid(fit: CONTAIN, grayscale: true) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {site, allMarkdownRemark} = data
      return(
      <Layout>
        <SEO title={site.siteMetadata.title} />
        <h1>Weblium blog</h1>
        <p>This is puper blog!</p>
        <p>Weblium blog</p>

        <h2>Articles</h2>
        {allMarkdownRemark.nodes.map((node) => <article
          css={css`
            display: inline-block;
            width: 360px;
            margin: 24px;
            text-align: center;
            padding: 16px;
            border: 2px solid #cdcdcd;
          `}
        >
          <Link to={node.frontmatter.slug}>
            <h3>{node.frontmatter.title}</h3>
          </Link>
          <Img
            fluid={node.frontmatter.image.childImageSharp.fluid}
            alt="headshot"
            objectFit="contain"
            className="my-image"
            imgStyle={{ objectFit: 'contain' }}
          />
          <small>{node.frontmatter.date}</small>
          <p>{node.excerpt}</p>
        </article>)}
      </Layout>
    )}}
  />
)

export default IndexPage
