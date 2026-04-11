// import logo from "../../assets/logo.jpg";

// const LogoBanner = () => {
//   return (
//     <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
//       <img
//         src={logo}
//         alt="يداً بيد - Helping Hand"
//         className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-popover shadow-md"
//       />

//     </div>
//   );
// };

// export default LogoBanner;

// absolute top-6 right-6 md:top-8 md:right-8 z-10
// w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-popover shadow-md
import logo from "../../assets/logo.jpg";

const LogoBanner = () => {
  return (
    <div className="logo-banner">
      <img src={logo} alt="Helping Hand" className="logo-image" />
    </div>
  );
};

export default LogoBanner;