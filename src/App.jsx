
import './App.css'
import { Button } from './components/ui/button'

function App() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-foreground">Aura Match</h1>
        <p className="text-muted-foreground">Welcome to your shadcn/ui setup!</p>
        <div className="flex gap-2 justify-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  )
}

export default App
