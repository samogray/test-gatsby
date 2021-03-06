import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"
import Layout from "../components/layout"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
         totalCount
         edges {
           node {
             frontmatter {
               date
               title
             }
             html
           }
           
         }
       }
       }
    `}
    render={data => <Layout>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              className={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: node.html }} ></div>
          </div>
        ))}
    </Layout>}
  />
)