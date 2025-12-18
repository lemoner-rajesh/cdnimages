import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./posts.css";
import { navigate } from "gatsby";
import { useEffect } from "react";
const IndexPage = () => {
  useEffect(() => {
    navigate("/en", { replace: true });
  }, []);

  return null;
};

export default IndexPage;