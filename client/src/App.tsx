import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { SessionProvider } from '@/context/SessionContext';
import { AdminSessionProvider } from '@/context/AdminSessionContext';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';

function App() {
  return (

    <SessionProvider>
      <AdminSessionProvider>
        <CustomCursor />
        <LoadingScreen />
        <RouterProvider router={router} />
      </AdminSessionProvider>
    </SessionProvider>
  );
}

export default App;
