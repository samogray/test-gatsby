import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const TemplateArticle = ({pageContext}) =>  {
  const {html, title, author, date, htmlAst} = pageContext
  console.log('htmlAst', htmlAst)
  return (
  <Layout>
    <SEO title="Page template" />
    <h1>{title}</h1>
    <p>{author}</p>
    <small>{date}</small>
    <div dangerouslySetInnerHTML={{ __html: html }} ></div>
  </Layout>
)
}
export default TemplateArticle
