import Evolution from './evolution';
import TypeEffect from './TypeEffect';
import Logo from '../../header/logo';

const CardInfo = ({ text }) => {
  return (
    <div className="bg-green-200 p-3 rounded-lg">
      <p className="font-semibold">{text}</p>
      <div className="flex justify-center gap-2 mt-2">
        <Evolution text="Evolution Component" />
        <TypeEffect text="Type Effect Component" />
        <Logo text="Logo in Card Info" />
      </div>
    </div>
  );
};

export default CardInfo;
