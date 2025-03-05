const Pizza = (props) => {
  const { name, description, image } = props;
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image ?? "https://picsum.photos/200"} alt={name} />
    </div>
  );
};

export default Pizza;
