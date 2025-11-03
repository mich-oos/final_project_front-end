import Gen1 from './Gen1';
import Gen2 from './Gen2';
import Gen3 from './Gen3';
import Gen4 from './Gen4';

const Generations = ({ text }) => {
  return (
    <div className="bg-blue-200 p-3 rounded-lg">
      <p className="font-semibold">{text}</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Gen1 text="Gen 1" />
        <Gen2 text="Gen 2" />
        <Gen3 text="Gen 3" />
        <Gen4 text="Gen 4" />
      </div>
    </div>
  );
};

export default Generations;
