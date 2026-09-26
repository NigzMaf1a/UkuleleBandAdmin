import { BrowserRouter } from "react-router-dom"

import PublicRoutes from "./routes/PublicRoutes"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App