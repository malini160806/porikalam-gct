import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { SessionProvider } from '@/context/SessionContext';
import { LoadingScreen } from '@/components/common/LoadingScreen';

function App() {
  return (
    <SessionProvider>
      <LoadingScreen />
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
