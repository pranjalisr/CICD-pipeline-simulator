'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stages = ['Build', 'Test', 'Deploy']

export function Pipeline({ latestCommit }: { latestCommit: string }) {
  const [currentStage, setCurrentStage] = useState(-1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (latestCommit) {
      setCurrentStage(0)
      setProgress(0)
    }
  }, [latestCommit])

  useEffect(() => {
    if (currentStage >= 0 && currentStage < stages.length) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setCurrentStage((stage) => stage + 1)
            return 0
          }
          return Math.min(oldProgress + 10, 100)
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [currentStage])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Status</CardTitle>
        <CardDescription>Current stage: {stages[currentStage] || 'Not running'}</CardDescription>
      </CardHeader>
      <CardContent>
        {stages.map((stage, index) => (
          <div key={stage} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{stage}</span>
              <span>{index === currentStage ? `${progress}%` : index < currentStage ? 'Complete' : 'Pending'}</span>
            </div>
            <Progress value={index === currentStage ? progress : index < currentStage ? 100 : 0} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

