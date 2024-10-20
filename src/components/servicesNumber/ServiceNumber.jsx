import './serviceNumber.css';

const ServiceNumber = ({services}) => {
  return <div className="serviceNumber" >{services?.length} Services Saved</div>;
};

export default ServiceNumber;
