import "./error.css";

export const Error = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>Something Went Wrong</h1>
      <p className='not-found-message'>
        Sorry, there was some error occured. Please refresh or go back to
        previous page
      </p>
    </div>
  );
};
