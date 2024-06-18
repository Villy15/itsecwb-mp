import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const UpdateDiscussion = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="w-[200px]"
      icon={<Edit className="size-4" />}
      onClick={() => {
        navigate('/discussions/update');
      }}
    >
      Update Discussion
    </Button>
  );
};

export default UpdateDiscussion;
