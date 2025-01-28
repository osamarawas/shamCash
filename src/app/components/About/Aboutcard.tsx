const Aboutcard = ({ links }) => {
    return (
      <div  className="flex flex-wrap justify-between items-center text-center mr-9 ml-9">
        {Array.isArray(links) && links.length > 0 ? (
          links.map((link, index) => (
            <div key={index} className="text-center justify-center h-96 w-96 flex flex-col items-center p-10 space-y-3 hover:bg-blue-100 rounded-full ">
              <img src={link.image} alt={link.title} className="bg-primary h-24 w-24 rounded-full text-center p-4"/>
              <h1 className="text-xl font-bold">{link.title}</h1>
              <p className="text-muted" dir="rtl">{link.p}</p>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
    );
  };
  
  export default Aboutcard;
  