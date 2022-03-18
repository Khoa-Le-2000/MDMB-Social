import { getLinkPreview } from 'link-preview-js';
import React from 'react';
import styled from 'styled-components';

const WarpLink = styled.div`
  width: 300px;
  cursor: pointer;
  img {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

const WrapRawLink = styled.a`
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
  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [urlPreview, setUrlPreview] = React.useState(url);
  if (!urlPreview.match('^https?:\\/\\/')) {
    setUrlPreview('http://' + urlPreview);
  }

  const fetchLinkPreview = React.useCallback(async () => {
    const data = await getLinkPreview(urlPreview);
    setTitle(data.title);
    setImage(data.images[0]);
    setDescription(data.description);
  }, [urlPreview]);

  React.useEffect(() => {
    fetchLinkPreview();
  }, [fetchLinkPreview]);

  function handleClick() {
    window.open(urlPreview, '_blank');
  }

  return (
    <WarpLink onClick={handleClick}>
      <WrapRawLink>{url}</WrapRawLink>
      <br />
      {image && <img src={image} alt="" />}
      {!image && !description && <WarpTitle>{title}</WarpTitle>}
      {description && <WarpDescription>{description}</WarpDescription>}
    </WarpLink>
  );
}

export default CardLink;
