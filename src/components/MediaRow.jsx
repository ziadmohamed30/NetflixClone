import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MediaRow({ title, fetchFunc, type }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchFunc().then((res) => setItems(res.data.results));
  }, [fetchFunc]);

  return (
    <div className="mb-6">
      <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-scroll gap-4 pb-4">
        {items.map((el) => (
          <Link to={`/${el.media_type || type}/${el.id}`} key={el.id}>
            <div className="w-35">
              <img
                src={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={el.title || el.name}
                className="rounded-xl hover:scale-105 transition"
              />
              {/* <p className="text-sm text-gray-300 mt-2 text-center">
                {el.title || el.name}
              </p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
