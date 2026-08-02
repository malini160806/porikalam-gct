import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { SessionProvider } from '@/context/SessionContext';

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
