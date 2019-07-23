import React from "react"
import { Link } from "gatsby"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Nav = () => (
  <nav style={{ marginBottom: `1.5rem` }}>
    <ul style={{ listStyle: `none`, float: `right` }}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/page-2/">page-2</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
      {/* <ListLink to="/data-from-markdown/">Markdown</ListLink> */}
    </ul>
  </nav>
)


export default Nav