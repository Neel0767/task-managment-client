import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { FaUsers } from "react-icons/fa";
import Layout from "@/layout/mainlayout";
import axios from "@/utils/axiosInstance";

interface Member {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  users: Member[];
}

interface User {
  id: string;
}

export default function TeamPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newTeam, setNewTeam] = useState<Omit<Team, "id">>({
    name: "",
    description: "",
    users: [],
  });
  const [token, setToken] = useState<string | null>(null);
  const [userIds, setUserIds] = useState<string[]>([]);

  // Fetch the access token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  // Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      if (token) {
        try {
          const res = await axios.get<{ data: Team[] }>("/teams");
          setTeams(res.data.data);
        } catch (err) {
          console.error("Error fetching teams:", err);
        }
      }
    };

    fetchTeams();
  }, [token]);

  // Fetch user IDs from /get-users endpoint
  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const res = await axios.get<{ data: User[] }>("/get-users");
        setUserIds(res.data.data.map((user) => user.id));
      } catch (err) {
        console.error("Error fetching user IDs:", err);
      }
    };

    fetchUserIds();
  }, []);

  // Fetch team details by ID
  const fetchTeamDetails = async (teamId: string) => {
    try {
      const res = await axios.get<{ data: Team }>(`/teams/${teamId}`);
      setSelectedTeam(res.data.data);
    } catch (err) {
      console.error("Error fetching team details:", err);
    }
  };

  // Handle input changes for new team form
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Member
  ) => {
    const { value } = e.target;
    const updatedMembers = [...newTeam.users];
    updatedMembers[index][field] = value;
    setNewTeam({ ...newTeam, users: updatedMembers });
  };

  // Handle input changes for new team name and description
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTeam({ ...newTeam, name: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTeam({ ...newTeam, description: e.target.value });
  };

  // Handle form submission for adding a new team
  const handleAddTeam = async () => {
    try {
      const teamData = {
        name: newTeam.name,
        description: newTeam.description,
        members: newTeam.users.map((users) => users.id), // Use member IDs fetched from /get-users
      };
      const res = await axios.post<{ data: Team }>(
        "/teams",
        teamData
      );
      console.log("Team added:", res.data.data);
      setTeams([...teams, res.data.data]);
      setNewTeam({
        name: "",
        description: "",
        users: [],
      });
      window.location.reload();
    } catch (err) {
      console.error("Error adding team:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Teams - Task Management App</title>
      </Head>

      <div className="flex max-w-7xl">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(teams) && teams.length > 0 ? (
              teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer"
                  onClick={() => fetchTeamDetails(team.id)}
                >
                  <FaUsers className="text-2xl text-gray-700" />
                  <span className="text-lg font-semibold text-gray-700">
                    {team.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No teams available.</p>
            )}
          </div>

          {selectedTeam && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Team Details
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Team Name:
                  </h3>
                  <p className="text-gray-700">{selectedTeam.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Team Members:
                  </h3>
                  <ul className="list-disc list-inside">
                    {selectedTeam.users?.map((member, index) => (
                      <li key={index} className="text-gray-700">
                        {member.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Add New Team
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-lg font-semibold text-gray-700">
                  Team Name:
                </label>
                <input
                  type="text"
                  value={newTeam.name}
                  onChange={handleNameChange}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-700">
                  Description:
                </label>
                <input
                  type="text"
                  value={newTeam.description}
                  onChange={handleDescriptionChange}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>

              <button onClick={handleAddTeam} className="mt-4 btn !p-2">
                Add Team
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

TeamPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
