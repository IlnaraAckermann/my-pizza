const PizzaCard = (props) => {
  const { name, description, price } = props;
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>R$ {price}</p>
    </div>
  );
};

export default PizzaCard;
