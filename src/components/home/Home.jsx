import Search from "./search";
import CardInfo from "./cardinfo/cardinfo";

const Home = ({ title }) => {
  return (
    <div className="bg-green-300 p-4 rounded">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3">
        <Search text="Search" />
        <CardInfo text="Card Info" />
      </div>
    </div>
  );
};

export default Home;
