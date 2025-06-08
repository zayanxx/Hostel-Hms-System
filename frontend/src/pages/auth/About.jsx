import { TeamCard } from "./TeamMember";

function About() {
  const teamMembers = [
    {
      name: "Henza",
      designation: "Receptionist",
    },
    {
      name: "Baby",
      designation: "Food Staff",
    },
    {
      name: "Karthi",
      designation: "Cleaning Staff",
    },
    {
      name: "Dhanush",
      designation: "Staff",
    },
    {
      name: "Zayan",
      designation: "Manager",
    },
  ];

  const defaultImage =
    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png";

  return (
    <div className="pt-16">
      {/* Team Section */}
      <h1 className="font-bold text-white text-center text-4xl lg:text-5xl mt-12">
        Meet Our Team!
      </h1>

      <div className="py-16 flex flex-wrap justify-center gap-10">
        {teamMembers.map((member, idx) => (
          <TeamCard
            key={idx}
            member={{ ...member, image: defaultImage }}
          />
        ))}
      </div>
    </div>
  );
}

export { About };