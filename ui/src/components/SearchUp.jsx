import { useState } from "react";
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
  fetch: nodeFetch,
});

export default function SearchUp({ imageUrl }) {

  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  const searchPhotos = async (e) => {
    e.preventDefault();

    unsplash.search.getPhotos({query: query, page: '1', perPage: '5'})
    .then((res) => {
        console.log(res.response.results);
        setPics(res.response.results);
    });
  };

  const handleSelectedImage = (event, id) =>{
    unsplash.photos.get({photoId: id})
    .then((res) => {
        console.log(res.response);
        setPics([res.response])

        // imageUrl(res.response.links.html)
        imageUrl(JSON.stringify({
            url: res.response.urls.full,
            name: res.response.user.name,
            profileUrl: res.response.user.links.html,
        }))

        // don't change this
        // this is for unsplash to trigger download event (required from their end)
        unsplash.photos.trackDownload({ downloadLocation: res.response.links.download_location, });
    })

  }

  return (
    <>  
        {"Click to select the image"}
      <form onSubmit={searchPhotos} >
        <label htmlFor="query">📷</label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "cat" or "dog"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {pics.map((pic) => (
            <>
            <img
            style={{height:'100px', width:'auto'}}
            alt={pic.alt_description}
            src={pic.urls.full}
            key={pic.id} onClick={(e) => handleSelectedImage(e, pic.id)}
            />
          </>
        ))}
      </div>
    </>
  );
}