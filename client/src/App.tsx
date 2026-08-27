import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { SessionProvider } from '@/context/SessionContext';
import { AdminSessionProvider } from '@/context/AdminSessionContext';
import { LoadingScreen } from '@/components/common/LoadingScreen';

function App() {
  return (
    
    <SessionProvider>
      <AdminSessionProvider>
        <LoadingScreen />
        <RouterProvider router={router} />
      </AdminSessionProvider>
    </SessionProvider>
  );
}

export default App;
