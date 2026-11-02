import { MotionConfig } from 'framer-motion';
import Home from './pages/Home';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Home />
    </MotionConfig>
  );
}
