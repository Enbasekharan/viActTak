import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="stories">
      {!hits?.length > 0 ? (
        <h2>No Items Found</h2>
      ) : (
        hits.map((story, index) => {
          const { urlToImage, source, author, title, publishedAt, url } = story;
          let date = new Date(publishedAt);
          let dateFormat =
            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
            "/" +
            (date.getMonth() > 8
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1)) +
            "/" +
            date.getFullYear();
          return (
            <article key={index} className="story">
              <div className="image">
                <img src={urlToImage} alt={title} className="image" />
              </div>

              <p>{source.name}</p>
              <p>{author}</p>

              <h5 className="title">{title}</h5>
              <p>{dateFormat}</p>

              <a
                href={url}
                // className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="remove-btn">read more</button>
              </a>
            </article>
          );
        })
      )}
    </section>
  );
};

export default Stories;
