import { useNavigate } from 'react-router-dom';

export const handleRefresh = (path: string) => {
  const navigate = useNavigate();
  navigate(`${path}`, { state: { refresh: true } });
};
