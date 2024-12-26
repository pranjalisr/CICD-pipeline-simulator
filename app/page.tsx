'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pipeline } from './components/Pipeline'
import { CommitHistory } from './components/CommitHistory'

export default function Home() {
  const [commitMessage, setCommitMessage] = useState('')
  const [commits, setCommits] = useState<string[]>([])

  const handleCommit = () => {
    if (commitMessage.trim()) {
      setCommits([commitMessage, ...commits])
      setCommitMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">CI/CD Pipeline Simulator</h1>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Make a Commit</CardTitle>
            <CardDescription>Enter a commit message to trigger the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter commit message"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
              />
              <Button onClick={handleCommit}>Commit</Button>
            </div>
          </CardContent>
        </Card>
        <Pipeline latestCommit={commits[0]} />
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Commit History</CardTitle>
          </CardHeader>
          <CardContent>
            <CommitHistory commits={commits} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

