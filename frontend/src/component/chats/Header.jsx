import Person from "../users/Person";

function Header({ receiver }) {
  return (
    <div className="w-full">
      <Person
        data={{
          _id: receiver._id,
          name: receiver.username,
          email: receiver.email,
        }}
        chat={true}
      />
    </div>
  );
}

export default Header;
