import React, { useState } from 'react';
import '../../css/feedback.css'; // Import external CSS file

const InteractiveRatingComponent = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    setSubmitted(true);
  };

  const handleRateAgain = () => {
    setSubmitted(false);
    setSelectedRating(0);
  };

  return (
    <div id='feedback'>
      <div className="contact-page-wrapper">
        <p className="primary-subheading">Feedback</p>
        <h1 className="primary-heading">Your feedback matters!</h1>   
        <h1 className="primary-heading"> Share your experience with us.</h1>
      </div>
      
      {/* Show feedback form if not submitted */}
      {!submitted && (
        <div className="container">
          <img src="./images/icon-star.svg" alt="" />
          <h1>How did we do?</h1>
          <p>
            Please let us know how we did with your support request. All feedback is
            appreciated to help us improve our offering!
          </p>
          <ul>
            {[1, 2, 3, 4, 5].map((rating) => (
              <li key={rating}>
                <button
                  className="btn"
                  onClick={() => handleRatingSelect(rating)}
                >
                  {rating}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn-submit"
            onClick={handleSubmitRating}
          >
            Submit
          </button>
        </div>
      )}

      {/* Show thank you message if submitted */}
      {submitted && (
        <div className="thank-you">
          <img src="./images/illustration-thank-you.svg" alt="" />
          <p className="gray">
            You selected &nbsp;<span id="rating">{selectedRating} </span>&nbsp; out of 5
          </p>
          <h2>Thank you!</h2>
          <p>
            We appreciate you taking the time to give a rating. If you ever need
            more support, don’t hesitate to get in touch!
          </p>
          <button
            className="btn-submit"
            id="rate-again"
            onClick={handleRateAgain}
          >
            Rate Again
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveRatingComponent;
