import { getLinkPreview } from "../../../../../../../node_modules/link-preview-js/build/index";
import React from 'react';
import styled from "styled-components";

const WarpLink = styled.div`
  width: 300px;
  img {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

const WarpRawLink = styled.a`
  color: #00bcd4;
  :hover {
    text-decoration: underline;
    color: #00bcd4;
  }
`;

const WarpTitle = styled.a` 
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 5px;
  :hover {
    text-decoration: underline;
    color: unset;
  }
`;
const WarpDescription = styled.div`
  font-weight: lighter;
  height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

`;

function CardLink({ url }) {
  const [title, setTitle] = React.useState(true);
  const [image, setImage] = React.useState(true);
  const [description, setDescription] = React.useState(true);

  const rawUrl = url;

  if (!url.match('^https?:\/\/')) url = 'http://' + url;
  getLinkPreview(url).then(data => {
    setTitle(data.title);
    setImage(data.images[0]);
    setDescription(data.description);
  });

  function handleClick() {
    window.open(url, '_blank');
  }

  return (
    // <a href={url}>
      <WarpLink onClick={handleClick}>
        <WarpRawLink>{rawUrl}</WarpRawLink>
        <br />
        {image && <img src={image} alt="" />}
        {(!image && !description) && <WarpTitle>{title}</WarpTitle>}
        {description && <WarpDescription>{description}</WarpDescription>}
      </WarpLink>
    // </a>
  );
}

export default CardLink;