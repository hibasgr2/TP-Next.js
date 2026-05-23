import { prisma } from "@/lib/prisma";
import AddProjectForm from "./AddProjectForm";
import { deleteProject } from "../actions/projects";


export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>{projects.length} projets</p>

      <AddProjectForm />

      <ul>
        {projects.map((p: { id: number; color: string; name: string }) => (
          <li key={p.id}>
            <span style={{ background: p.color }} />
            <a href={`/projects/${p.id}`}>{p.name}</a>

            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button>🗑</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
