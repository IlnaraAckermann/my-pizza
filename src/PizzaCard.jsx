const PizzaCard = (props) => {
  const { name, description, image } = props;
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image} alt={name} />
    </div>
  );
};

export default PizzaCard;
