const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, photoUrl, gender } = user;
  return (
    <div className="card bg-base-300 w-80 shadow-xl">
      <figure>
        <img src={photoUrl} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + ", " + age}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intersted</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;