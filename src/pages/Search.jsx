
const Home = () => {
  const firstlist = useFormations();
  return (
    <>
    {Array.isArray(firstlist) ?
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div>
      <SearchList title={"De la catégorie informatique"} list={ firstlist }></SearchList>
      </div>
    </div>
    : null}
    </>
  );
};

export default Home;
