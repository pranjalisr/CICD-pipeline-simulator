import { ScrollArea } from "@/components/ui/scroll-area"

export function CommitHistory({ commits }: { commits: string[] }) {
  return (
    <ScrollArea className="h-[200px]">
      {commits.length === 0 ? (
        <p className="text-center text-gray-500">No commits yet</p>
      ) : (
        <ul className="space-y-2">
          {commits.map((commit, index) => (
            <li key={index} className="bg-white p-2 rounded shadow">
              <span className="font-mono text-sm text-gray-500">#{commits.length - index}</span> {commit}
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}

