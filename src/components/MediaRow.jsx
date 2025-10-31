import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noImg from "../assets/images/noImg.png";

export default function MediaRow({ title, fetchFunc, type }) {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchFunc().then((res) => setItems(res.data.results));
  }, [fetchFunc]);

  return (
    <div className="mb-6">
      <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-scroll gap-4 pb-4">
        {items.map((el) => (
          <Link
            to={`/${el.media_type || type}/${el.id}`}
            key={el.id}
            state={{ background: location }}
          >
            <div className="w-35">
              <img
                src={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                    : noImg
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
