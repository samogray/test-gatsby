/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import { StaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import Header from "./header"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        allMarkdownRemark: { edges },
      } = data
      return (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            css={css`
              margin: 0 auto;
              max-width: 1200px;
              padding: ${rhythm(2)};
              padding-top: ${rhythm(1.5)};
            `}
          >
              <main>{children}</main>
              <aside  css={css`
                width: 600px;
              `}>
                <ul>
                  {edges.map(({ node }) => (
                    <li key={node.frontmatter.slug}>
                      <Link to={node.frontmatter.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
          </div>
          <footer>
              © {new Date().getFullYear()}, Built with &nbsp;
              {data.site.siteMetadata.author}&nbsp;
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
