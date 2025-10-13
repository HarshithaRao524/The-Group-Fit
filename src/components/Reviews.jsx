import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || rating === 0) return;
    setReviews([...reviews, { text, rating }]);
    setText("");
    setRating(0);
  };

  return (
    <div className="py-12 px-4 md:px-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">User Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-2 border rounded w-32"
        >
          <option value={0}>Rate</option>
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={5}>5 ⭐</option>
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-700 text-white p-2 rounded w-32"
        >
          Submit
        </button>
      </form>

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <p className="font-semibold">Rating: {review.rating} ⭐</p>
            <p>{review.text}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
