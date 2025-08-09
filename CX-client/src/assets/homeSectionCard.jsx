const HomeSectionCard = ({ icon: Icon, title, description }) => {
  return (
    <section className="flex flex-row bg-[#0C121E] p-6 rounded-lg ">
      <div className="w-14 h-7 flex items-center justify-center  text-gray-400 rounded-full mb-4">
        {Icon && <Icon size={28} />}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>
    </section>
  );
};
export default HomeSectionCard;
