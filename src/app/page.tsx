"use client";

import DP from "../algorithm/DP";
import { FormEvent, useState } from "react";

interface Project {
  projectName: string;
  member: number;
  profit: number;
}

interface Result {
  maxProfit: number;
  selectedProjects: Project[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState(0);
  const [chosenProjects, setChosenProjects] = useState<Project[]>([]);
  const [profit, setProfit] = useState(0);
  const [member, setMember] = useState(0);
  const [projectName, setProjectName] = useState("");

  const submitProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate input
    if (projectName === "" || profit === 0 || member === 0) {
      return;
    }

    // Add new project
    let temp = [...projects];
    temp.push({ projectName: projectName, member: member, profit: profit });
    setProjects(temp);
  };

  const optimizeResource = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Validate projects
    if (projects.length === 0 || members === 0) {
      return;
    }

    // Optimize with DP
    let optimize = new DP();
    let result: Result = optimize.optimize(projects, members);
    setChosenProjects(result.selectedProjects);
  };

  const reset = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Reset
    setProjects([]);
    setChosenProjects([]);
  };

  return (
    <>
      <main className="bg-gray-400 min-h-[100vh] flex">
        <div className="w-1/4 fixed h-full border-2 pt-10 flex flex-col">
          <h1 className="text-3xl font-semibold text-center">
            Resource Management
          </h1>
          <div className="flex flex-col gap-2 items-center mt-4">
            <label>Available Members</label>
            <input
              type="number"
              value={members}
              className="text-center p-2"
              onChange={(e) => setMembers(Number(e.target.value))}
            />
          </div>
          <form className="mt-12" onSubmit={(e) => submitProject(e)}>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-semibold text-center">
                New Project
              </h1>
              <div className="flex flex-col gap-2">
                <label>Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  className="p-2"
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <label>Profit</label>
                <input
                  type="number"
                  value={profit}
                  className="p-2"
                  onChange={(e) => setProfit(Number(e.target.value))}
                />
                <label>Jumlah Anggota</label>
                <input
                  type="number"
                  value={member}
                  className="p-2"
                  onChange={(e) => setMember(Number(e.target.value))}
                />
              </div>
              <button type="submit" className="border-2 px-4 py-2">
                Submit
              </button>
            </div>
          </form>
          <button
            type="button"
            className="mt-8 text-2xl border-2 mx-12 py-4"
            onClick={(e) => optimizeResource(e)}
          >
            Optimize!
          </button>
          <button
            type="button"
            className="mt-4 text-2xl border-2 mx-12 py-4"
            onClick={(e) => reset(e)}
          >
            Reset!
          </button>
        </div>
        <div className="w-3/4 px-16 py-8 ml-[25%] max-h-[100vh]">
          <div className="flex flex-col gap-10 h-full">
            <div className="h-1/2 max-h-1/2 overflow-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-500">
              <h1 className="text-2xl text-center font-semibold">
                List All Projects
              </h1>
              <table className="border-2 w-full bg-white overflow-y-auto">
                <thead>
                  <tr className="border-2">
                    <th className="w-1/3 border-2">Project Name</th>
                    <th className="w-1/6 border-2">Needed Members</th>
                    <th className="w-1/6 border-2">Profits</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((el, idx) => (
                    <tr key={idx} className="border-2">
                      <td className="border-2 p-2">{el.projectName}</td>
                      <td className="border-2 p-2">{el.member}</td>
                      <td className="border-2 p-2">{el.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-1/2 max-h-1/2 overflow-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-500">
              <h1 className="text-2xl text-center font-semibold">
                Chosen Projects
              </h1>
              <table className="border-2 w-full bg-white overflow-y-auto">
                <thead>
                  <tr className="border-2">
                    <th className="w-1/3 border-2">Project Name</th>
                    <th className="w-1/6 border-2">Needed Members</th>
                    <th className="w-1/6 border-2">Profits</th>
                  </tr>
                </thead>
                <tbody>
                  {chosenProjects.map((el, idx) => (
                    <tr key={idx} className="border-2">
                      <td className="border-2 p-2">{el.projectName}</td>
                      <td className="border-2 p-2">{el.member}</td>
                      <td className="border-2 p-2">{el.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
