import { useResults } from "../../../context/DataContext";

const toUppercase = (text) => text.toUpperCase();

const ScoreBoard = () => {
  const { results, uniquePrograms, groupPrograms, singlePrograms } = useResults();
  const teamNames = ["KAMAR", "HILAL", "HIJAS", "LULU", "HAIKI", "MARAM"];


  const getTotalPointsForTeam = (team) => {
    const teamResults = results.filter(
      (result) => result.teamName.toUpperCase() === team
    );
    return teamResults.reduce((total, curr) => total + curr.points, 0);
  };

  const renderProgramRows = (programs) =>
    programs.map((program) => {
      return (
        <tr key={program} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
          <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-300 border">
            {toUppercase(program)}
          </td>
          {teamNames.map((team) => {
            const teamResults = results.filter(
              (result) =>
                result.programName.toUpperCase() === program &&
                result.teamName.toUpperCase() === team
            );

            if (teamResults.length > 0) {
              const points = teamResults.map((result) => result.points).join(" + ");
              const prizes = teamResults.map((result) => result.prize);

              return (
                <td key={team} className="px-4 py-3 text-center border">
                  <span>
                    {points}{" "}
                    {prizes.includes("First") && (
                      <span className="text-yellow-500">(🥇)</span>
                    )}
                    {prizes.includes("Second") && (
                      <span className="text-gray-500">(🥈)</span>
                    )}
                    {prizes.includes("Third") && (
                      <span className="text-orange-400">(🥉)</span>
                    )}
                  </span>
                </td>
              );
            }
            return <td key={team} className="px-4 py-3 text-center border"></td>;
          })}
        </tr>
      );
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center  mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          SCOREBOARD
        </h1>

      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border border-gray-200 text-sm sm:text-base dark:border-gray-700">
          <thead>
            <tr className="bg-blue-100 text-gray-800 dark:bg-blue-900 dark:text-gray-200">
              <th className="px-4 py-3 text-left border">PROGRAM NAME</th>
              {teamNames.map((team) => (
                <th key={team} className="px-4 py-3 text-center border">
                  {toUppercase(team)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {singlePrograms.length > 0 && renderProgramRows(singlePrograms)}
            {uniquePrograms.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={teamNames.length + 1}
                    className="bg-blue-50 px-4 py-3 text-center font-bold uppercase text-blue-800 dark:bg-blue-700 dark:text-blue-200 border"
                  >
                    SINGLE PROGRAMS
                  </td>
                </tr>
                {renderProgramRows(uniquePrograms)}
              </>
            )}
            {groupPrograms.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={teamNames.length + 1}
                    className="bg-green-50 px-4 py-3 text-center font-bold uppercase text-green-800 dark:bg-green-700 dark:text-green-200 border"
                  >
                    GROUP PROGRAMS
                  </td>
                </tr>
                {renderProgramRows(groupPrograms)}
              </>
            )}
            <tr className="bg-gray-100 dark:bg-gray-800">
              <td className="px-4 py-3 font-bold border dark:text-gray-200">TOTAL</td>
              {teamNames.map((team) => (
                <td
                  key={team}
                  className="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300 border"
                >
                  {getTotalPointsForTeam(team)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreBoard;
