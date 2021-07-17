import React, { lazy, Suspense } from 'React';
const Greet = lazy(() => import("remote/Greet"));

const App = () => {
  return <>
    <Suspense fallback={() => "Loading"}>
      <Greet name="John Cena"></Greet>
    </Suspense>
  </>
};

export default App;
